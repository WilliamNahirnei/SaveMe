"use client";

import { Drawer, List, ListItem, ListItemText, Box, AppBar, Toolbar, Typography, Container } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import './globals.css';

export default function RootLayout({ children }) {
  const menuItems = [
    { text: "Home", href: "/" },
    { text: "Pedidos Socorro", href: "/HelpPoints" },
    { text: "Usuários", href: "/Users" },
    { text: "Configurações", href: "/configuracoes" }
  ];

  // Função para formatar o nome da rota como título
  const getPageTitle = () => {
    const pathname = usePathname();
    const title = pathname.replace("/", ""); // Remove a barra inicial
    return title.charAt(0).toUpperCase() + title.slice(1); // Capitaliza a primeira letra
  };

  return (
    <html lang="pt">
      <body>
        {/* Drawer lateral fixo */}
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{ width: 250, flexShrink: 0 }}
        >
          <Box sx={{ width: 250 }}>
            <List>
              {menuItems.map((item, index) => (
                <ListItem button key={index} component={Link} href={item.href}>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Conteúdo principal */}
        <Box sx={{ display: 'flex', ml: 30, flexDirection: 'column', width: '100%' }}>
          {/* AppBar com título dinâmico e centralizado */}
          <AppBar position="static">
            <Toolbar>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ flexGrow: 1, textAlign: 'center' }}
              >
                {getPageTitle() || "Home"} {/* Título dinâmico da página */}
              </Typography>
            </Toolbar>
          </AppBar>

          <Container sx={{ mt: 2, width: "90%", marginLeft: 0}} maxWidth={false}>
            {children}
          </Container>
        </Box>
      </body>
    </html>
  );
}
