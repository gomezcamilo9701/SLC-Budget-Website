import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { TEventContactsResponse } from '../../types';
import ContactCard from '../contact_card/ContactCard';
import { useStyles } from './ActivityFormStyle';
import { ActivityParticipantsTable } from '../activity_participants/ActivityParticipantsTable';

type ActivityFormProps = {
  setOpenModalActivity: (value: React.SetStateAction<boolean>) => void;
  eventContacts: TEventContactsResponse[];
  eventId: string;
}

export type TParticipationData = {
  [key: string]: {
    participationPercentage: number;
    staticValue: number;
  };
};

export type TActivityCreate = {
  description: string;
  eventId: string;
  value: number;
  participationData: TParticipationData | null;
}

export const ActivityForm:React.FC<ActivityFormProps> = ({
  setOpenModalActivity,
  eventContacts,
  eventId,
}) => {
  // #region Estados
  const [selectedContacts, setSelectedContacts] = useState<TEventContactsResponse[]>([]);

  const [activityForm, setActivityForm] = useState<TActivityCreate>({
    description: '',
    eventId: eventId,
    value: 0,
    participationData: null
  });
  // #endregion
  const handleToggleSelection = (eventContact: TEventContactsResponse) => {
    const isSelected = selectedContacts.some((contact) => contact.contactId === eventContact.contactId);

    setSelectedContacts((prevSelectedContacts) =>
      isSelected
        ? prevSelectedContacts.filter((contact) => contact.contactId !== eventContact.contactId)
        : [...prevSelectedContacts, eventContact]
    );
  };

  useEffect(() => {
    console.log('activityForm', activityForm);
  }, [activityForm]);

  const handleFormSubmit = () => {

  };

  const handleParticipationChange = (key: string, property: string, value: number) => {
    setActivityForm((prevForm) => {
      const updatedParticipationData = prevForm.participationData || {};
      const existingPercentage = updatedParticipationData[key]?.participationPercentage || 0;
      const existingStaticValue = updatedParticipationData[key]?.staticValue || 0;
      
      updatedParticipationData[key] = {
        ...updatedParticipationData[key],
        [property]: value,
      };
      return {
        ...prevForm,
        participationData: updatedParticipationData,
      };
    });
  };

  return (
    <Card sx={useStyles.principalCard}>
      <Grid container sx={useStyles.container}>
        <Typography>
          Crear actividad
        </Typography>

        <Grid item xs={12} sm={12} md={12}>
          <form onSubmit={handleFormSubmit}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  label="Descripción"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={activityForm.description}
                  onChange={(e) => 
                    setActivityForm((prevForm) => ({
                      ...prevForm,
                      description: e.target.value
                    }))}
                />
                <TextField
                  label="Valor"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
                  value={activityForm.value}
                  onChange={(e) => setActivityForm((prevForm) => ({
                    ...prevForm,
                    value: parseInt(e.target.value)
                  }))}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} sx={{ overflowX: 'auto'}}>
                <Typography>
                  Contactos del evento
                </Typography>
                <Grid container spacing={2} sx={{ width: 'unset', flexWrap: 'nowrap' }}>
                  {eventContacts
                    .map((eventContact) => (
                    <Grid item sx={useStyles.cardMapping} xs={4} sm={3} md={2} key={eventContact.contactId}>
                        <ContactCard
                          eventContact={eventContact}
                          onAddClick={handleToggleSelection}
                          isSelected={selectedContacts.some((contact) => contact.contactId === eventContact.contactId)}
                        />
                    </Grid>
                    ))}
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <ActivityParticipantsTable
                  participants={selectedContacts}
                  handleParticipationChange={handleParticipationChange}
                  activityForm={activityForm}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Button type="submit" variant="contained" color="primary">
                  Crear Actividad
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <Button variant="contained" onClick={() => setOpenModalActivity(false)}>
          <CloseIcon />
        </Button>
      </Grid>
    </Card>
  )
}
