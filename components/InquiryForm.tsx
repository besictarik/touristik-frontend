"use client";

import { Dictionary } from "@/lib/types/definitions";
import { usePathname } from "next/navigation";
import { handleEmail } from "@/lib/actions";
import { useFormState } from "react-dom";

const InquiryForm = ({ t }: { t: Dictionary["Listing"] }) => {
  const pathname = usePathname();
  const handleEmailWithPathname = handleEmail.bind(null, pathname);
  const initialState = { message: null, status: null };
  const [state, action, isPending] = useFormState(
    handleEmailWithPathname,
    initialState,
  );

  return (
    <div className="bg-light-1 flex flex-col gap-5 text-dark-3 border border-dark-5 border-opacity-50 shadow-drop-shadow-1 p-10 xl:p-5 sticky top-10">
      <h2 className="text-2xl font-serif text-dark-5 block">
        {t.sendAnInquiry}
      </h2>
      <p className="block">{t.replyTime}</p>
      {state.status === null && (
        <form action={action} className="flex flex-col gap-5">
          <div className="flex sm:flex-col gap-5">
            <div className="flex-1">
              <label htmlFor="firstName">{t.firstName}*</label>
              <input
                type="text"
                name="firstName"
                className="p-2.5 w-full rounded-none border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
                placeholder="John"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="lastName">{t.lastName}*</label>
              <input
                type="text"
                name="lastName"
                className="p-2.5 w-full rounded-none border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
                placeholder="Doe"
                required
              />
            </div>
          </div>
          <div className="flex sm:flex-col gap-5">
            <div className="flex sm:flex-col flex-1 flex-col">
              <label htmlFor="phoneNumber" className="block">
                {t.phoneNumber}*
              </label>
              <input
                type="tel"
                name="phoneNumber"
                className="block p-2.5 w-full rounded-none border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
                placeholder="+385 223 2332"
                required
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="email" className="block">
                {t.emailAddress}*
              </label>
              <input
                type="email"
                name="emailAddress"
                className="block p-2.5 w-full rounded-none border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
                placeholder="john.doe@gmail.com"
                required
              />
            </div>
          </div>
          <div className="flex sm:flex-col gap-5">
            <div className="flex-1">
              <label htmlFor="checkInDate">{t.checkInDate}</label>
              <input
                type="date"
                name="checkInDate"
                className="appearance-none text-xs block bg-white text-dark-5 text-opacity-50 p-2.5 w-full rounded-none border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="checkOutDate">{t.checkOutDate}</label>
              <input
                type="date"
                name="checkOutDate"
                className="text-xs appearance-none block bg-white text-dark-5 text-opacity-50 p-2.5 w-full rounded-none border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="message">{t.message}</label>
            <textarea
              name="message"
              className="p-2.5 w-full rounded-none border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
              placeholder="We'd like to know..."
            />
          </div>
          <div className="flex gap-5 sm:flex-col">
            <div className="flex-1">
              <label htmlFor="guests">{t.guests}*</label>
              <input
                type="number"
                name="guests"
                className="p-2.5 w-full rounded-none border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
                placeholder="2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="invisible sm:hidden">Placeholder text</label>
              <button
                className="p-2.5  w-full bg-dark-5 text-light-1 border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
                type="submit"
                disabled={isPending}
              >
                {t.send}
              </button>
            </div>
          </div>
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
    </div>
  );
};

export default InquiryForm;
