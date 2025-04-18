import React, { useState, useEffect } from "react";
import {
  TextField, Button, Checkbox, FormControlLabel, CircularProgress, Snackbar, Alert,
  Card, CardContent, Grid, Typography
} from "@mui/material";
import { X } from "lucide-react";
import { fetchUsers, updateGroup, getGroupById } from "../../services/groups_service";
import { useParams } from "react-router-dom";

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  statut: string;
}

const UpdateGroupPage = () => {
    const { groupeId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const onClose = () => {
 
    window.history.back();
  
    
    // window.location.href = "/groupes";
  };
  
  useEffect(() => {
    if (!groupeId) {
      setError("Identifiant de groupe manquant.");
      setIsLoading(false);
      return;
    }
  
    const controller = new AbortController(); // pour annuler les fetchs si nécessaire
  
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // reset de l'erreur à chaque appel
  
      try {
        const [fetchedUsers, groupData] = await Promise.all([
          fetchUsers(),
          getGroupById(groupeId)
        ]);
  
        if (!controller.signal.aborted) {
          setUsers(fetchedUsers);
          setName(groupData.nom);
          setDescription(groupData.description);
          setDate(groupData.date_creation);
          setSelectedAdmins(groupData.administrateurs);
          setSelectedMembers(groupData.membres);
        }
      } catch (err: any) {
        if (!controller.signal.aborted) {
          setError(`Erreur lors du chargement: ${err.message || "Erreur inconnue"}`);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };
  
    fetchData();
  
    return () => {
      controller.abort(); // nettoyage lors du démontage
    };
  }, [groupeId]);
  

  const toggleSelection = (
    id: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const isSelected = list.includes(id);
    setList(isSelected ? list.filter(item => item !== id) : [...list, id]);
  };

  const handleUpdateGroup = async () => {
    if (!groupeId) {
      setError("Identifiant du groupe introuvable.");
      return;
    }
  
    if (!name || !description || !date || selectedAdmins.length === 0 || selectedMembers.length === 0) {
      setError("Veuillez remplir tous les champs et sélectionner au moins un administrateur et un membre.");
      return;
    }
  
    try {
      await updateGroup(groupeId, name, description, date, selectedAdmins, selectedMembers);
      setSuccessMessage("Groupe mis à jour avec succès !");
      setTimeout(() => {
        onClose();
      }, 3000); 
    } catch (err: any) {
      setError(`Erreur lors de la mise à jour: ${err.message || "Erreur inconnue"}`);
    }
  };
  

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(px)",
      zIndex: 1000, display: "flex", justifyContent: "flex-end"
    }}>
      <div style={{
        width: "700px", height: "100%", backgroundColor: "white", padding: "16px",
        overflowY: "auto", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
      }}>
        <button onClick={onClose} style={{ marginBottom: "16px" }}>
          <X className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
        </button>

        <Typography variant="h4" gutterBottom>
          Modifier le Groupe
        </Typography>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {/* Infos générales */}
            <Card style={{ marginBottom: "16px" }}>
              <CardContent>
                <Typography variant="h6">Informations Générales</Typography>
                <TextField
                  label="Nom du Groupe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Description du Groupe"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Date de Création"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </CardContent>
            </Card>

            {/* Admins */}
            <Card style={{ marginBottom: "16px" }}>
              <CardContent>
                <Typography variant="h6">Administrateurs</Typography>
                <Grid container spacing={2}>
                  {users
                    .filter(user => user.statut === "admin" || user.statut === "superadmin")
                    .map(user => (
                      <Grid item xs={12} sm={6} key={user.id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedAdmins.includes(user.id)}
                              onChange={() => toggleSelection(user.id, selectedAdmins, setSelectedAdmins)}
                            />
                          }
                          label={`${user.nom} ${user.prenom} (${user.statut})`}
                        />
                      </Grid>
                    ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Membres */}
            <Card style={{ marginBottom: "16px" }}>
              <CardContent>
                <Typography variant="h6">Membres</Typography>
                <Grid container spacing={2}>
                  {users.map(user => (
                    <Grid item xs={12} sm={6} md={4} key={user.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedMembers.includes(user.id)}
                            onChange={() => toggleSelection(user.id, selectedMembers, setSelectedMembers)}
                          />
                        }
                        label={`${user.nom} ${user.prenom} (${user.statut})`}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUpdateGroup}
              style={{ marginTop: "16px", borderRadius: "50px", backgroundColor: "orange" }}
            >
              Mettre à jour le Groupe
            </Button>
          </>
        )}

        {/* Notifications */}
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
        </Snackbar>
        <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage(null)}>
          <Alert severity="success" onClose={() => setSuccessMessage(null)}>{successMessage}</Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default UpdateGroupPage;
