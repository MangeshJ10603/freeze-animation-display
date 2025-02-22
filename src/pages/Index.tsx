
import { useState } from "react";
import { faker } from "@faker-js/faker";
import { Home, QrCode, Settings, Snowflake } from "lucide-react";
import { motion } from "framer-motion";

const PaymentCard = () => {
  const [isFrozen, setIsFrozen] = useState(false);
  const [activeMode, setActiveMode] = useState<"pay" | "card">("card");
  
  const cardData = {
    number: faker.finance.creditCardNumber("#### #### #### ####"),
    expiry: faker.date.future().toLocaleDateString("en-US", { month: "2-digit", year: "2-digit" }),
    cvv: faker.finance.creditCardCVV(),
    holderName: faker.person.fullName()
  };

  const handleFreeze = () => {
    setIsFrozen(!isFrozen);
  };

  const handleCopyDetails = async () => {
    try {
      await navigator.clipboard.writeText(cardData.number);
      console.log("Card details copied!");
    } catch (err) {
      console.error("Failed to copy card details");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold mb-2">select payment mode</h1>
        <p className="text-gray-400 text-sm">
          choose your preferred payment method to make payment.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-4 mb-6 sm:mb-8">
        <button
          className={`px-4 py-2 rounded-full ${
            activeMode === "pay"
              ? "bg-white/10 text-white"
              : "text-gray-500"
          }`}
          onClick={() => setActiveMode("pay")}
        >
          pay
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            activeMode === "card"
              ? "bg-white/10 text-white"
              : "text-gray-500"
          }`}
          onClick={() => setActiveMode("card")}
        >
          card
        </button>
      </div>

      {/* Card Label */}
      <div className="mb-4 text-sm text-gray-400 uppercase tracking-wide">
        Your digital debit card
      </div>

      {/* Card Container */}
      <div className="relative">
        {/* Card */}
        <motion.div
          className="relative aspect-[1.586/1] w-full max-w-md mx-auto mb-8"
        >
          <div className={`w-full h-full rounded-2xl overflow-hidden relative`}>
            <motion.div
              className="absolute inset-0"
              animate={{
                filter: isFrozen ? "blur(8px) brightness(0.8)" : "blur(0px) brightness(1)",
              }}
              transition={{ duration: 0.5 }}
            >
              {!isFrozen ? (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 p-6">
                  <div className="h-full flex flex-col justify-between">
                    {/* Card Details */}
                    <div className="space-y-4">
                      <div className="text-lg sm:text-2xl font-mono tracking-wider">
                        {cardData.number}
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>
                          <div className="text-gray-400">expiry</div>
                          {cardData.expiry}
                        </span>
                        <span>
                          <div className="text-gray-400">cvv</div>
                          {cardData.cvv}
                        </span>
                      </div>
                    </div>
                    {/* Card Footer */}
                    <div className="flex justify-between items-end">
                      <button 
                        onClick={handleCopyDetails}
                        className="text-red-500 text-sm hover:text-red-400 transition-colors"
                      >
                        copy details
                      </button>
                      <img src="/uploads/c7c9094a-a65f-4449-ae34-183256791d0e.png" alt="Card Logo" className="h-6 sm:h-8" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
                  <img 
                    src="/uploads/160ade71-f238-4e1b-86c6-6775f43969ad.png" 
                    alt="Frozen Card" 
                    className="w-full h-full object-cover opacity-50"
                  />
                </div>
              )}
            </motion.div>
          </div>

          {/* Freeze Button - Repositioned to top-right */}
          <motion.button
            onClick={handleFreeze}
            className="absolute -right-4 -top-4 z-10"
            whileTap={{ scale: 0.95 }}
          >
            <div className={`p-3 rounded-full bg-black/80 backdrop-blur-lg shadow-lg ${isFrozen ? 'text-red-500' : 'text-gray-400'} hover:scale-110 transition-transform`}>
              <Snowflake className="w-6 h-6" />
            </div>
            <span className="text-xs mt-1 block text-center">
              {isFrozen ? 'unfreeze' : 'freeze'}
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg">
        <div className="max-w-md mx-auto px-6 sm:px-8 py-4 flex justify-between items-center">
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
            <Home size={24} />
            <span className="text-xs">home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
            <QrCode size={24} />
            <span className="text-xs">yolo pay</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
            <Settings size={24} />
            <span className="text-xs">girlie</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
