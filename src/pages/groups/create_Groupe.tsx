import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  TextField,
  Button,
  Checkbox,
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
import { fetchUsers, createGroup } from "../../services/groups_service";
interface User {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    statut: string; // Exemple : "admin" ou "membre"
  }
  const CreateGroupPage = ({ onClose }: { onClose: () => void }) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);
    const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
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
  
    const handleCreateGroup = async () => {
      if (!name || !description || !date || selectedAdmins.length === 0 || selectedMembers.length === 0) {
        setError("Veuillez remplir tous les champs et sélectionner au moins un administrateur et un membre.");
        return;
      }
  
      try {
        await createGroup(name, description, date, selectedAdmins, selectedMembers);
        setSuccessMessage("Groupe créé avec succès!");
        setName("");
        setDescription("");
        setDate("");
        setSelectedAdmins([]);
        setSelectedMembers([]);
        setTimeout(() => {
          onClose();
        }, 3000); 
      } catch (err: any) {
        setError(`Erreur lors de la création du groupe: ${err.message}`);
      }
    };
  
    const toggleSelection = (
      id: string,
      list: string[],
      setList: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
      const isSelected = list.includes(id);
      setList(isSelected ? list.filter((item) => item !== id) : [...list, id]);
    };
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
          backdropFilter: "blur(5px)", // Flou de l'arrière-plan
          zIndex: 1000,
          display: "flex",
          justifyContent: "flex-end", // Positionne le modal à droite
        }}
      >
        <div
          style={{
            width: "700px",
            height: "100%",
            backgroundColor: "white",
            padding: "16px",
            overflowY: "auto",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <button onClick={onClose} style={{ marginBottom: "16px" }}
            >
            <X className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor:pointer" />
          </button>
         
          <Typography variant="h4" gutterBottom>
            Créer un Groupe
          </Typography>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Card style={{ marginBottom: "16px" }}>
                <CardContent>
                  <Typography variant="h6">Informations Générales</Typography>
                  <TextField
                    label="Nom du Groupe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{
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
                    }}
                  />
                  <TextField
                    label="Description du Groupe"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{
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
                    }}
                  />
                  <TextField
                    label="Date de Création"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    sx={{
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
                    }}
                  />
                </CardContent>
              </Card>
              <Card style={{ marginBottom: "16px" }}>
                <CardContent>
                  <Typography variant="h6">Sélectionner des Administrateurs</Typography>
                  <Grid container spacing={2}>
                    {users
                              .filter((user) => user.statut === "admin" || user.statut === "superadmin") 
                      .map((user) => (
                        <Grid item xs={12} sm={8} md={6} key={`admin-${user.id}`}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedAdmins.includes(user.id)}
                                onChange={() => toggleSelection(user.id, selectedAdmins, setSelectedAdmins)}
                              />
                            }
                            label={
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <Avatar style={{ marginRight: "8px" }}>{user.nom[0]}</Avatar>
                                <div>
                                  <Typography variant="body1">
                                    {user.nom} {user.prenom}
                                  </Typography>
                                  <Typography variant="body2" color="textSecondary">
                                    {user.statut}
                                  </Typography>
                                </div>
                              </div>
                            }
                          />
                        </Grid>
                      ))}
                  </Grid>
                </CardContent>
              </Card>
              <Card style={{ marginBottom: "16px" }}>
                <CardContent>
                  <Typography variant="h6">Sélectionner des Membres</Typography>
                  <Grid container spacing={2}>
                    {users.map((user) => (
                      <Grid item xs={12} sm={6} md={4} key={`member-${user.id}`}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedMembers.includes(user.id)}
                              onChange={() => toggleSelection(user.id, selectedMembers, setSelectedMembers)}
                            />
                          }
                          label={
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Avatar style={{ marginRight: "8px" }}>{user.nom[0]}</Avatar>
                              <div>
                                <Typography variant="body1">
                                  {user.nom} {user.prenom}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                  {user.statut}
                                </Typography>
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
                onClick={handleCreateGroup}
                fullWidth
               
                style={{ marginTop: "16px" , borderRadius: "50px" , borderColor: "orange", backgroundColor: "orange"}}
              >
                Créer le Groupe
              </Button>
            </>
          )}
          {error && (
            <Snackbar
              open={!!error}
              autoHideDuration={6000}
              onClose={() => setError(null)}
            >
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            </Snackbar>
          )}
          {successMessage && (
            <Snackbar
              open={!!successMessage}
              autoHideDuration={6000}
              onClose={() => setSuccessMessage(null)}
            >
              <Alert severity="success" onClose={() => setSuccessMessage(null)}>
                {successMessage}
              </Alert>
            </Snackbar>
          )}
        </div>
      </div>
    );
  };
  
  export default CreateGroupPage;