import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

interface Deal {
  id: number;
  name: string;
  contact: {
    name: string;
    email: string;
  } | null;
  company: {
    name: string;
  } | null;
  stage: string;
  budget: number;
}

const App: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDeals();
  }, []);

  useEffect(() => {
    if (query.length >= 3) {
      fetchDeals();
    }
  }, [query]);

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/amo-crm/deals", {
        params: { query },
      });
      setDeals(response.data.deals);
    } catch (error) {
      console.error("Error fetching deals:", error);
    } finally {
      setLoading(false);
    }
  };

  const RenderLoader = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  };

  return (
    <Container>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading ? (
        RenderLoader()
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Название сделки</TableCell>
                <TableCell>Ответственный</TableCell>
                <TableCell>Контакт</TableCell>
                <TableCell>Компания контакта</TableCell>
                <TableCell>Этап Сделки</TableCell>
                <TableCell>Бюджет</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell>{deal.name}</TableCell>
                  <TableCell>{deal.contact?.name || "N/A"}</TableCell>
                  <TableCell>{deal.contact?.email || "N/A"}</TableCell>
                  <TableCell>{deal.company?.name || "N/A"}</TableCell>
                  <TableCell>{deal.stage}</TableCell>
                  <TableCell>{deal.budget}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default App;
