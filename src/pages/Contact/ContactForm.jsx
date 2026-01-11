import { useForm, ValidationError } from "@formspree/react";

function ContactForm() {
  const [state, handleSubmit] = useForm("mzddpqpn");
  if (state.succeeded) {
    return <p>Thanks for contacting us! We will get you soon.</p>;
  }
  return (
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <label htmlFor="name" className="fieldset-legend">
        Your Name*
      </label>
      <input id="name" type="text" name="name" className="input w-full" />
      <ValidationError prefix="Name" field="name" errors={state.errors} />

      {/* Email Address */}
      <label htmlFor="email" className="fieldset-legend">
        Your Email*
      </label>
      <input id="email" type="email" name="email" className="input w-full" />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      {/* Message */}
      <label htmlFor="message" className="fieldset-legend">
        Your Message
      </label>
      <textarea
        id="message"
        name="message"
        className="block rounded w-full h-32 px-4 py-3 text-gray-800 border border-gray-300"
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button
        type="submit"
        className="my-7 btn bg-[#62ab00] btn-block text-white"
        disabled={state.submitting}
      >
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
