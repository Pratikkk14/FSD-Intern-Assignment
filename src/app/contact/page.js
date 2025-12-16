import { Mail, Phone, User } from "lucide-react";

export default function Contact() {
  // Replace these with your actual information
  const contactInfo = {
    name: "Pratik Jagannth Pujari", // Your full name
    mobile: "+91 8767638547", // Your mobile number
    email: "pratik.pujari@vit.edu.in", // Your email address
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
      </div>

      {/* Contact Card */}
      <div className="max-w-md mx-auto">
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
            <p className="text-sm text-muted-foreground">
              Let's connect and discuss opportunities
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            {/* Name */}
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Name</p>
                <p className="font-semibold">{contactInfo.name}</p>
              </div>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Mobile</p>
                <a
                  href={`tel:${contactInfo.mobile}`}
                  className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {contactInfo.mobile}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <a
              href={`mailto:${contactInfo.email}`}
              className="block w-full text-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
