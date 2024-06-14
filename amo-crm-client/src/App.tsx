// App.tsx
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

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/amo-crm/deals",
          {
            params: { query },
          }
        );
        setDeals(response.data.deals);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    fetchDeals();
  }, [query]);

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название сделки</TableCell>
              <TableCell>Ответственный</TableCell>
              <TableCell>Эмейл контакта</TableCell>
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
    </Container>
  );
};

export default App;

// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import axios from "axios";

// interface Deal {
//   id: number;
//   name: string;
//   contact: {
//     name: string;
//     email: string;
//   } | null;
//   company: {
//     name: string;
//   } | null;
//   stage: string;
//   budget: number;
// }

// const App: React.FC = () => {
//   const [deals, setDeals] = useState<Deal[]>([]);
//   const [query, setQuery] = useState<string>("");

//   useEffect(() => {
//     const fetchDeals = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3001/amo-crm/deals",
//           {
//             params: { query },
//           }
//         );
//         setDeals(response.data.deals);
//       } catch (error) {
//         console.error("Error fetching deals:", error);
//       }
//     };

//     fetchDeals();
//   }, [query]);

//   // useEffect(() => {
//   //   const fetchDeals = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         "http://localhost:3001/amo-crm/deals",
//   //         {
//   //           params: { query },
//   //         }
//   //       );
//   //       const dealsData = response.data.deals.map((deal: any) => ({
//   //         id: deal.id,
//   //         name: deal.name,
//   //         contact:
//   //           deal._embedded.contacts && deal._embedded.contacts.length > 0
//   //             ? deal._embedded.contacts[0].name
//   //             : "N/A",
//   //         company:
//   //           deal._embedded.companies && deal._embedded.companies.length > 0
//   //             ? deal._embedded.companies[0].name
//   //             : "N/A",
//   //         stage: deal.status_id, // Map this to a stage name if necessary
//   //         budget: deal.price,
//   //       }));
//   //       setDeals(dealsData);
//   //     } catch (error) {
//   //       console.error("Error fetching deals:", error);
//   //     }
//   //   };

//   //   fetchDeals();
//   // }, [query]);

//   return (
//     <Container>
//       <TextField
//         label="Search"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Название сделки</TableCell>
//               <TableCell>Основной контакт</TableCell>
//               <TableCell>Компания контакта</TableCell>
//               <TableCell>Этап Сделки</TableCell>
//               <TableCell>Бюджет</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {deals.map((deal) => (
//               <TableRow key={deal.id}>
//                 <TableCell>{deal.name}</TableCell>
//                 <TableCell>{deal.contact}</TableCell>
//                 <TableCell>{deal.company}</TableCell>
//                 <TableCell>{deal.stage}</TableCell>
//                 <TableCell>{deal.budget}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default App;
