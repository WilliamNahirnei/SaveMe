"use client";
import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { store } from '../api/helpPoint-api';
import { useSnackbar } from 'notistack';

export const dynamic = 'force-static';

// Atualiza a posição do mapa
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && map) {
      map.setView(center);  // Define a nova posição do mapa mantendo o zoom
    }
  }, [center, map]);

  return null;
}

// Função para atualizar o marcador no mapa ao clicar
function LocationMarker({ latitude, longitude, setLatitude, setLongitude }) {
  useMapEvents({
    click(e) {
      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
    }
  });

  return latitude && longitude ? (
    <Marker position={[latitude, longitude]} icon={L.icon({
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png'
    })}>
      <Popup>
        Latitude: {latitude}, Longitude: {longitude}
      </Popup>
    </Marker>
  ) : null;
}

export default function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [numberPeople, setNumberPeople] = useState('');
  const [numberAnimals, setNumberAnimals] = useState('');
  const [details, setDetails] = useState('');
  const { enqueueSnackbar } = useSnackbar();


  // Obtém a localização do usuário ao carregar a página
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
          alert('Não foi possível obter a localização. Por favor, insira manualmente.');
        }
      );
    } else {
      alert('Geolocalização não é suportada pelo seu navegador. Por favor, insira manualmente.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      latitude,
      longitude,
      numberPeople: parseInt(numberPeople),
      numberAnimals: parseInt(numberAnimals),
      details
    };

    try {
      const response = await fetch('/api/saveme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Pedido de socorro enviado com sucesso!');
      } else {
        alert('Erro ao enviar o pedido de socorro.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao enviar o pedido de socorro.');
    }
  };

  const storeNewHelpPoint = async (e) => {
    e.preventDefault();
    // const isValidFields = validateFields();
    // if (isValidFields) {
      const helpPointData = await mountHelpPointObjectData();
      const helpPointStoredResponse = await store(helpPointData, enqueueSnackbar);
    // }
  };

  const mountHelpPointObjectData = async () => {
    return {
      latitude,
      longitude,
      numberPeople: parseInt(numberPeople),
      numberAnimals: parseInt(numberAnimals),
      details
    };
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
      <Box sx={{ mt: 4, flex: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro de Pedido de Socorro
        </Typography>
        <form onSubmit={storeNewHelpPoint}>
          <TextField
            label="Número de Pessoas"
            variant="outlined"
            type="number"
            fullWidth
            margin="normal"
            value={numberPeople}
            onChange={(e) => setNumberPeople(e.target.value)}
            required
          />
          <TextField
            label="Número de Animais"
            variant="outlined"
            type="number"
            fullWidth
            margin="normal"
            value={numberAnimals}
            onChange={(e) => setNumberAnimals(e.target.value)}
            required
          />
          <TextField
            label="Detalhes"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />

          {/* Exibir o mapa para o usuário ajustar a localização */}
          <Box sx={{ height: '300px', margin: '20px 0' }}>
            <MapContainer center={[latitude || 0, longitude || 0]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} />
              <MapUpdater center={[latitude || 0, longitude || 0]} />
            </MapContainer>
          </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Enviar Pedido de Socorro
          </Button>
        </form>
      </Box>
      <Box sx={{ py: 2, backgroundColor: '#fff' }} />
    </Container>
  );
}