"use client";

export default function LeadCaptureForm() {
  async function handleForm(event) {
    event.preventDefault(); //stop http api, which reload page
    const formData = new FormData(event.target);
    console.log(formData);
    const dataObject = Object.fromEntries(formData);
    console.log(dataObject);
    const jsonData = JSON.stringify(dataObject);
    console.log(jsonData);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };
    console.log(options);
    // const response = await fetch("/api/leads/", options)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("data", data);
    //   });
  }

  return (
    <form className="space-x-3" onSubmit={handleForm}>
      <input type="email" required name="email" placeholder="Your Email" />
      <button
        className="bg-green-500 hover:bg-green-700 text-white px-3 rounded"
        type="submit"
      >
        Join list
      </button>
    </form>
  );
}
