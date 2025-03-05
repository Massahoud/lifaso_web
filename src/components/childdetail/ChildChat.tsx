

const ChatBox = () => {
  return (
    <div className="max-w-lg mx-auto border rounded-lg shadow-md">
      <div className="bg-gray-700 text-white p-2 rounded-t-lg flex items-center">
        <span className="text-sm font-semibold">BOITE DE DIALOGUE</span>
      </div>
      <div className="p-4 space-y-4">
        {/* Message 1 */}
        <div className="flex items-start space-x-2">
          <img
            src="https://via.placeholder.com/40"
            alt="David Demange"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="bg-gray-100 p-2 rounded-lg text-gray-900">
              On va mettre cet enfant à l’abris.
            </div>
            <span className="text-xs text-gray-500">David Demange • 8:45</span>
          </div>
        </div>

        {/* Message 2 */}
        <div className="flex items-end justify-end space-x-2">
          <div className="text-right">
            <div className="bg-orange-500 text-white p-2 rounded-lg">
              C’est noté. Je m’en occupe !
            </div>
            <span className="text-xs text-gray-500">Dylan Grava • 9:32</span>
          </div>
          <img
            src="https://via.placeholder.com/40"
            alt="Dylan Grava"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
      <div className="p-2 border-t flex items-center">
        <input
          type="text"
          placeholder="Write a message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none"
        />
      </div>
    </div>
  );
};

export default ChatBox;
