import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { sendInboundEmail } from "../services/api";

const INITIAL_STATE = { sender: "", subject: "", message: "" };
const INITIAL_ERRORS = { sender: "", subject: "", message: "" };

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(fields) {
  const errors = { sender: "", subject: "", message: "" };
  if (!fields.sender) errors.sender = "Email is required.";
  else if (!validateEmail(fields.sender)) errors.sender = "Enter a valid email address.";
  if (!fields.subject.trim()) errors.subject = "Subject cannot be empty.";
  if (!fields.message.trim()) errors.message = "Message cannot be empty.";
  return errors;
}

export function useEmailForm() {
  const [fields, setFields] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  const addLog = useCallback((entry) => {
    setLogs((prev) => [{ id: Date.now(), ts: new Date().toISOString(), ...entry }, ...prev].slice(0, 20));
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const newErrors = validate(fields);
      if (Object.values(newErrors).some(Boolean)) {
        setErrors(newErrors);
        return;
      }

      setLoading(true);
      addLog({ type: "request", payload: { ...fields } });

      try {
        const result = await sendInboundEmail(fields);
        addLog({ type: "response", status: result.status, data: result.data });
        setFields(INITIAL_STATE);
        setErrors(INITIAL_ERRORS);
        toast.success(result.data?.message || "Email submitted successfully!");
      } catch (err) {
        addLog({ type: "error", message: err.message });
        toast.error(err.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [fields, addLog]
  );

  const clearLogs = useCallback(() => setLogs([]), []);

  return { fields, errors, loading, logs, handleChange, handleSubmit, clearLogs };
}
