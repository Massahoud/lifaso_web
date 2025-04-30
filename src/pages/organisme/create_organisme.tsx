import  { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  TextField,
  Button,
  Radio,
  FormControlLabel,
  CircularProgress,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Avatar,
  Grid,
  Typography,
} from "@mui/material";
import { fetchUsers } from "../../services/organisme_services";
import { createOrganisme } from "../../services/organisme_services";

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  statut: string;
}

const CreateOrganismePage = ({ onClose }: { onClose: () => void }) => {
  const [nom, setNom] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateCreation, setDateCreation] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [superadminId, setSuperadminId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (err: any) {
        setError(`Erreur lors de la récupération des utilisateurs: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  const handleCreateOrganisme = async () => {
    if (!nom || !description || !dateCreation ) {
      setError("Veuillez remplir tous les champs et sélectionner un superadmin.");
      return;
    }

    try {
      await createOrganisme(nom, description, dateCreation, superadminId);
      setSuccessMessage("Organisme créé avec succès!");
      setNom("");
      setDescription("");
      setDateCreation("");
      setSuperadminId("");
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err: any) {
      setError(`Erreur lors de la création de l’organisme: ${err.message}`);
    }
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(5px)", zIndex: 1000, display: "flex", justifyContent: "flex-end" }}>
      <div style={{ width: "600px", height: "100%", backgroundColor: "white", padding: "16px", overflowY: "auto" }}>
        <button onClick={onClose} style={{ marginBottom: "16px" }}>
          <X className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor:pointer" />
        </button>
        <Typography variant="h4" gutterBottom>Créer un Organisme</Typography>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Card style={{ marginBottom: "16px" }}>
              <CardContent>
                <Typography variant="h6">Informations Générales</Typography>
                <TextField label="Nom de l'Organisme" value={nom} onChange={(e) => setNom(e.target.value)} fullWidth margin="normal"  sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "50px", 
                        "& fieldset": {
                          borderColor: "gray", 
                        },
                        "&:hover fieldset": {
                          borderColor: "orange", 
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "orange",
                        },
                      },
                    }} />
                <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth margin="normal" sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "50px", 
                        "& fieldset": {
                          borderColor: "gray", 
                        },
                        "&:hover fieldset": {
                          borderColor: "orange", 
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "orange",
                        },
                      },
                    }} />
                <TextField label="Date de Création" type="date" value={dateCreation} onChange={(e) => setDateCreation(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "50px", 
                        "& fieldset": {
                          borderColor: "gray", 
                        },
                        "&:hover fieldset": {
                          borderColor: "orange", 
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "orange",
                        },
                      },
                    }} />
              </CardContent>
            </Card>

            <Card style={{ marginBottom: "16px" }}>
              <CardContent>
                <Typography variant="h6">Sélectionner le Superadmin</Typography>
                <Grid container spacing={2}>
                  {users
                    .filter((user) => user.statut === "superadmin")
                    .map((user) => (
                      <Grid item xs={12} sm={6} md={6} key={user.id}>
                        <FormControlLabel
                          control={
                            <Radio
                              checked={superadminId === user.id}
                              onChange={() => setSuperadminId(user.id)}
                            />
                          }
                          label={
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Avatar style={{ marginRight: "8px" }}>{user.nom[0]}</Avatar>
                              <div>
                                <Typography variant="body1">{user.nom} {user.prenom}</Typography>
                                <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                              </div>
                            </div>
                          }
                        />
                      </Grid>
                    ))}
                </Grid>
              </CardContent>
            </Card>

            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateOrganisme}
              fullWidth
              style={{ marginTop: "16px", borderRadius: "50px", backgroundColor: "orange" }}
            >
              Créer l’Organisme
            </Button>
          </>
        )}

        {error && (
          <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
            <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
          </Snackbar>
        )}
        {successMessage && (
          <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage(null)}>
            <Alert severity="success" onClose={() => setSuccessMessage(null)}>{successMessage}</Alert>
          </Snackbar>
        )}
      </div>
    </div>
  );
};

export default CreateOrganismePage;
