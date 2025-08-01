"use client";
import { useState } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { emailService } from "@/lib/email-client";

export default function AppointmentPage() {
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  async function handleSubmit(formData: FormData) {
    try {
      const fullName = formData.get("full-name") as string;
      const nameParts = fullName.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      const data = {
        firstName,
        lastName,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        service: formData.get("service") as string,
        date: formData.get("preferred-date") as string,
        time: formData.get("preferred-time") as string,
        meetingType: formData.get("meeting-type") as string,
        message: formData.get("message") as string,
      };

      const result = await emailService.submitAppointmentForm(data);
      setFormStatus({
        submitted: true,
        success: result.success,
        message: result.message,
      });
    } catch (error) {
      setFormStatus({
        submitted: true,
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 ethnic-pattern">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
                <h1 className="text-3xl font-bold tracking-tighter font-serif sm:text-5xl">
                  Book an Appointment
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Schedule a consultation with us to discuss your financial needs and goals.
                </p>
              </div>
            </div>

            <div className="rounded-lg border bg-background p-8 shadow-sm mt-12">
              <h3 className="text-xl font-bold mb-6">Book Your Appointment</h3>

              {formStatus.submitted && (
                <div
                  className={`p-4 mb-6 rounded-md ${formStatus.success ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}
                >
                  <p className="text-sm font-medium">{formStatus.message}</p>
                </div>
              )}

              <form action={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="full-name" className="text-sm font-medium leading-none">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="full-name"
                    name="full-name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium leading-none">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium leading-none">
                    Service Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option value="tax-planning">Tax Planning & Preparation</option>
                    <option value="audit">Audit & Assurance</option>
                    <option value="financial-advisory">Financial Advisory</option>
                    <option value="bookkeeping">Bookkeeping</option>
                    <option value="payroll">Payroll Services</option>
                    <option value="business-consulting">Business Consulting</option>
                    <option value="other">Other (Please specify)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="preferred-date" className="text-sm font-medium leading-none">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="preferred-date"
                      name="preferred-date"
                      type="date"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="preferred-time" className="text-sm font-medium leading-none">
                      Preferred Time <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="preferred-time"
                      name="preferred-time"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a time
                      </option>
                      <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="afternoon">Afternoon (12:00 PM - 3:00 PM)</option>
                      <option value="evening">Evening (3:00 PM - 6:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="meeting-type" className="text-sm font-medium leading-none">
                    Meeting Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="meeting-type"
                    name="meeting-type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select meeting type
                    </option>
                    <option value="in-person">In-Person</option>
                    <option value="video">Video Conference</option>
                    <option value="phone">Phone Call</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium leading-none">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Please share any specific questions or concerns you'd like to discuss during the appointment"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Book Appointment
                </button>

                {/* <p className="text-xs text-muted-foreground text-center">
                  By booking an appointment, you agree to our{" "}
                  <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                </p> */}
              </form>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 ethnic-pattern">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="ethnic-divider">
                  <span className="text-primary font-serif px-4">FAQ</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter font-serif sm:text-4xl">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about our appointment process.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 pt-12 lg:grid-cols-2">
              <div className="space-y-2 p-6 border border-border rounded-lg hover:border-primary/30 transition-colors">
                <h3 className="text-xl font-bold">How long does an initial consultation take?</h3>
                <p className="text-muted-foreground">
                  Initial consultations typically last 45-60 minutes. This gives us enough time to
                  understand your needs, answer your questions, and provide preliminary guidance.
                </p>
              </div>
              <div className="space-y-2 p-6 border border-border rounded-lg hover:border-primary/30 transition-colors">
                <h3 className="text-xl font-bold">Is there a fee for the initial consultation?</h3>
                <p className="text-muted-foreground">
                  We offer a complimentary 30-minute initial consultation. If your needs require
                  additional time, our team will discuss fee structures before proceeding.
                </p>
              </div>
              <div className="space-y-2 p-6 border border-border rounded-lg hover:border-primary/30 transition-colors">
                <h3 className="text-xl font-bold">What should I bring to my appointment?</h3>
                <p className="text-muted-foreground">
                  After booking, we&apos;ll send you a detailed email with specific documents to
                  bring based on your needs. Generally, recent financial statements, tax returns,
                  and any specific financial concerns are helpful.
                </p>
              </div>
              <div className="space-y-2 p-6 border border-border rounded-lg hover:border-primary/30 transition-colors">
                <h3 className="text-xl font-bold">Can I reschedule my appointment?</h3>
                <p className="text-muted-foreground">
                  Yes, you can reschedule your appointment up to 24 hours before the scheduled time.
                  Please contact us by phone or email to make changes to your appointment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
