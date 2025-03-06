import { useEffect, useState, useRef } from "react";
import api from "../../services/api"; // Import de l'instance axios avec le token

interface ChatBoxProps {
  enqueteId?: string;
}

interface Message {
  id: string; // Ajout de l'id Firestore
  userId: string;
  text: string;
  date: string;
}

interface User {
  id: string;
  nom: string;
  prenom: string;
  photo: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ enqueteId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<{ [key: string]: User }>({});
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  const userId = localStorage.getItem("userId"); // ID de l'utilisateur connecté
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Récupération de l'utilisateur connecté
  useEffect(() => {
    if (!userId) return;
    api.get(`/users/${userId}`)
      .then((response) => setCurrentUser(response.data))
      .catch((error) => console.error("Erreur récupération user connecté :", error));
  }, [userId]);

  // Chargement des messages
  useEffect(() => {
    if (!enqueteId) return;

    api.get(`/chat/${enqueteId}`)
      .then((response) => {
        const messagesData = Array.isArray(response.data.data) ? response.data.data : [];
        const formattedMessages = messagesData.map((msg: any) => ({
          id: msg.id, // Récupération de l'ID Firestore
          userId: msg.userId,
          text: msg.text,
          date: msg.date,
        }));
        setMessages(formattedMessages);
        fetchUserDetails(formattedMessages);
      })
      .catch((error) => console.error("Erreur chargement messages :", error));
  }, [enqueteId]);

  // Auto-scroll à chaque mise à jour des messages
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Récupération des infos des utilisateurs
  const fetchUserDetails = async (messagesData: Message[]) => {
    const uniqueUserIds = [...new Set(messagesData.map(msg => msg.userId))];
    const userDetails: { [key: string]: User } = {};
    await Promise.all(uniqueUserIds.map(async (userId) => {
      try {
        const res = await api.get(`/users/${userId}`);
        userDetails[userId] = res.data;
      } catch (error) {
        console.error(`Erreur récupération user ${userId} :`, error);
      }
    }));
    setUsers(userDetails);
  };

  // Envoi d'un message
  const sendMessage = async () => {
    if (!newMessage.trim() || !userId) return;
    try {
      const response = await api.post("/chat", {
        enquete_id: enqueteId,
        userId: userId,
        text: newMessage,
      });

      const newMsg = {
        id: response.data.id, // Assurez-vous que l'API renvoie l'ID
        userId: userId,
        text: newMessage,
        date: new Date().toISOString(),
      };

      setMessages([...messages, newMsg]);
      fetchUserDetails([...messages, newMsg]);
      setNewMessage("");
    } catch (error) {
      console.error("Erreur envoi message :", error);
    }
  };

  // Suppression d'un message
  const deleteMessage = async (messageId: string) => {
    if (!messageId) return;

    try {
      await api.delete(`/chat/${messageId}`); // Suppression via API
      setMessages(messages.filter((msg) => msg.id !== messageId)); // Mise à jour locale
    } catch (error) {
      console.error("Erreur suppression message :", error);
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-5 flex flex-col h-58">
      <div ref={chatRef} className="flex-1 overflow-y-auto space-y-4 p-2">
        {messages.map((msg, index) => {
          const user = users[msg.userId];
          const isCurrentUser = msg.userId === userId;

          return (
            <div key={index} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}> 
              {!isCurrentUser && user?.photo && (
                <img src={user.photo} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
              )}

              <div>
                <div className={`p-2 rounded-lg ${isCurrentUser ? 'bg-orange-500 text-white' : 'bg-gray-300 text-black'}`}>
                  <p>{msg.text}</p>
                </div>
                
                <div className="flex items-center text-xs text-gray-500 space-x-2 mt-1">
                  <span>
                    {user ? `${user.prenom} ${user.nom}` : "Utilisateur inconnu"}, {new Date(msg.date).toLocaleTimeString()}
                  </span>

                  {/* Bouton de suppression sur la même ligne */}
                  {isCurrentUser && (
                    <button 
                      className="text-red-700 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm("Voulez-vous supprimer ce message ?")) {
                          deleteMessage(msg.id);
                        }
                      }}
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>

              {isCurrentUser && currentUser?.photo && (
                <img src={currentUser.photo} alt="Avatar" className="w-8 h-8 rounded-full ml-2" />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center p-0">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrire un message..."
        />
        <button onClick={sendMessage} className="bg-orange-500 text-white px-4 py-2 rounded-lg ml-2">
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
