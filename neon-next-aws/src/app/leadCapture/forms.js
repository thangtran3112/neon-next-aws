"use client";
import { useState, useRef } from "react";

export default function LeadCaptureForm() {
  const [loading, setLoading] = useState(false);

  async function handleForm(event) {
    event.preventDefault(); //stop http api, which reload page
    setLoading(true);
    const formData = new FormData(event.target);
    const dataObject = Object.fromEntries(formData);
    const jsonData = JSON.stringify(dataObject);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };
    const response = await fetch("/api/leads/", options);
    const responseData = await response.json();
    console.log(responseData);
    setLoading(false);
  }

  const btnLabel = loading ? "Loading..." : "Join list";

  return (
    <form className="space-x-3" onSubmit={handleForm}>
      <input type="text" required name="email" placeholder="Your Email" />
      <button
        disabled={loading}
        className="bg-green-500 hover:bg-green-700 text-white px-3 rounded"
        type="submit"
      >
        {btnLabel}
      </button>
    </form>
  );
}
