"use client";

import { Dictionary } from "@/lib/types/definitions";
import { useFormState } from "react-dom";
import { sendEmailHelp } from "@/lib/actions";
import { usePathname } from "next/navigation";

const NeedHelpForm = ({ t }: { t: Dictionary }) => {
  const pathname = usePathname();
  const sendEmailHelpWithPathname = sendEmailHelp.bind(null, pathname);
  const initialState = { message: null, status: null };
  const [state, action, isPending] = useFormState(
    sendEmailHelpWithPathname,
    initialState,
  );

  return (
    <>
      {state.status === null && (
        <form action={action} className="flex flex-col gap-5">
          <div className="flex gap-5">
            <div className="flex-1">
              <label htmlFor="firstName">{t.NeedHelp.firstName}*</label>
              <input
                type="text"
                id={"firstName"}
                name="firstName"
                className="p-2.5 text-dark-5 w-full rounded-none border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
                placeholder="John"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="lastName">{t.NeedHelp.lastName}*</label>
              <input
                type="text"
                id={"lastName"}
                name="lastName"
                className="p-2.5 text-dark-5 w-full rounded-none border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
                placeholder="Doe"
                required
              />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-1 flex-col">
              <label htmlFor="phoneNumber" className="block">
                {t.NeedHelp.phoneNumber}*
              </label>
              <input
                type="tel"
                id={"phoneNumber"}
                name="phoneNumber"
                className="block p-2.5 w-full text-dark-5 rounded-none border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
                placeholder="+385 223 2332"
                required
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="email" className="block">
                {t.NeedHelp.emailAddress}*
              </label>
              <input
                type="email"
                id={"email"}
                name="email"
                autoComplete={"email"}
                className="block p-2.5 w-full rounded-none text-dark-5 border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
                placeholder="john.doe@gmail.com"
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="message">{t.NeedHelp.message}</label>
            <textarea
              id={"message"}
              name="message"
              className="p-2.5 w-full rounded-none text-dark-5 border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
              placeholder="We'd like to know..."
            />
          </div>
          <button
            className="p-2.5 w-full rounded-none bg-light-5 text-dark-4 border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
            type="submit"
            disabled={isPending}
          >
            {t.NeedHelp.send}
          </button>
        </form>
      )}
      {state.status === "success" && (
        <p className="text-green-700">Inquiry successfully sent.</p>
      )}
      {state.status === "error" && (
        <p className="text-red-700">
          Something failed. Please contact us directly at info@tst-touristik.de
          or try again later.
        </p>
      )}
    </>
  );
};

export default NeedHelpForm;
