"use client";

// MAIN LANDING PAGE
import {
  Container,
  Button,
  Typography,
  Box,
  Grid,
  AppBar,
  Toolbar,
  Card,
  CardContent,
} from "@mui/material";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import getStripe from "../utils/get-stripe";
import { useAuth } from "@clerk/nextjs";
import LibraryBookIcon from "@mui/icons-material/LibraryBooks";
import CreateIcon from "@mui/icons-material/Create";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

export default function Home() {
  // This function handles the Stripe checkout process when a user selects the Pro plan.
  const { isSignedIn } = useAuth();
  // const router = useRouter();
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };
  const href = isSignedIn ? "/generate" : "/sign-in";
  return (
    <Box>
      {/* Header and Navbar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#1B1B1B",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Button
            sx={{
              gap: 2,
              "&:hover": {
                backgroundColor: "#f89090", // Custom hover background color
              },
            }}
            href="/"
          >
            <LibraryBookIcon sx={{ color: "#FFFFFF", fontSize: 32 }} />
          </Button>
          <Typography
            variant={"h4"}
            color={"#FFFFFF"}
            sx={{
              flexGrow: 1,
              fontFamily: `'Fredericka the Great', cursive`,
              fontWeight: "200",
            }}
          >
            Study Stash
          </Typography>
          <SignedOut>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Button
                variant="contained"
                sx={{
                  border: "4px solid #f89090",
                  backgroundColor: "#676767", // Custom background color
                  color: "#FFFFFF", // Custom text color
                  "&:hover": {
                    backgroundColor: "#f89090", // Custom hover background color
                  },
                }}
                href="/sign-in"
              >
                Login
              </Button>
              <Button
                color="inherit"
                variant="contained"
                sx={{
                  border: "4px solid #f89090",
                  backgroundColor: "#676767", // Custom background color
                  color: "#FFFFFF", // Custom text color
                  "&:hover": {
                    backgroundColor: "#f89090", // Custom hover background color
                  },
                }}
                href="/sign-up"
              >
                Sign Up
              </Button>
            </Box>
          </SignedOut>
          <SignedIn>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <Button
                color="inherit"
                variant="contained"
                sx={{
                  border: "4px solid #f89090",
                  backgroundColor: "#676767",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#f89090",
                  },
                }}
                href="/generate"
              >
                Generate
              </Button>
              <Button
                color="inherit"
                variant="contained"
                sx={{
                  border: "4px solid #f89090",
                  backgroundColor: "#676767",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#f89090",
                  },
                }}
                href="/saved_cards"
              >
                Saved Cards
              </Button>
              <UserButton />
            </Box>
          </SignedIn>
        </Toolbar>
      </AppBar>
      {/* Hero Section */}
      <Container
        sx={{
          textAlign: "center",
          my: 4,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: `'Fredericka the Great', cursive`,
            fontWeight: "400",
            fontStyle: "normal",
            textShadow: "6px 6px 6px #f89090",
          }}
        >
          Boost Your Learning, One Flashcard at a Time
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            fontFamily: `Great Vibes, cursive`,
            fontWeight: 400,
            textShadow: "6px 6px 6px #f89090",
          }}
        >
          The easiest way to create flashcards from your text.
        </Typography>
        <Button
          variant="contained"
          sx={{
            width: "200px",
            border: "4px solid #f89090",
            backgroundColor: "#676767", // Custom background color
            color: "#FFFFFF", // Custom text color
            "&:hover": {
              backgroundColor: "#f89090", // Custom hover background color
            },
          }}
          href={href}
        >
          Get Started
        </Button>
      </Container>
      {/* Feature Section */}
      {/* This section highlights the key features of the application, using a grid layout to display them. */}
      <Box
        sx={{
          my: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box sx={{ marginBottom: "50px" }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontFamily: `Great Vibes, cursive`,
              fontWeight: 400,
              textShadow: "6px 6px 6px #f89090",
            }}
          >
            Features
          </Typography>
        </Box>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center" // Center items vertically within the grid
          style={{
            backgroundColor: "#000",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <CreateIcon sx={{ color: "#FFFFFF", fontSize: 50 }} />
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 400 }}
            >
              AI-Powered Flashcard Generation
            </Typography>
            <Typography color={"white"}>
              Automatically generate flashcards from the text you provide.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <BookmarkIcon sx={{ color: "#FFFFFF", fontSize: 50 }} />
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 400 }}
            >
              Saved Flashcard Sets
            </Typography>
            <Typography color={"white"}>
              Easily save and access your flashcard sets for future study
              sessions
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FolderOpenIcon sx={{ color: "#FFFFFF", fontSize: 50 }} />
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 400,
              }}
            >
              Interactive Learning
            </Typography>
            <Typography color={"white"}>
              Engage with your material through interactive flashcards designed
              to enhance your study experience.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {/* Pricing Section - This section displays the pricing plans, including a “Pro” plan that uses Stripe for payment processing. */}
      <Box
        sx={{
          my: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box sx={{ marginBottom: "50px" }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontFamily: `Great Vibes, cursive`,
              fontWeight: 400,
              textShadow: "6px 6px 6px #f89090",
            }}
          >
            Pricing
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "350px", // Set a fixed height
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#333", // Dark background color for the card
              }}
            >
              <CardContent sx={{ textAlign: "center", padding: 6 }}>
                <Box mb={2}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: `'Fredericka the Great', cursive`,
                      fontWeight: "400",
                      fontStyle: "normal",
                    }}
                  >
                    Basic Plan
                  </Typography>
                </Box>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ fontWeight: "bold", color: "#f89090" }}
                >
                  $0
                </Typography>
                <Box mt={2}>
                  <Typography
                    variant="h7"
                    component="div"
                    sx={{ color: "#c4c0c0" }}
                  >
                    Get started with essential features at no cost. Enhance your
                    study experiences with flashcards created by our artificial
                    intelligent model.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: "flex", flexDirection: "column" }}
            gap={4}
          >
            <Card
              sx={{
                height: "350px", // Set a fixed height
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#333", // Dark background color for the card
              }}
            >
              <CardContent sx={{ textAlign: "center", padding: 6 }}>
                <Box mb={2}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: `'Fredericka the Great', cursive`,
                      fontWeight: "400",
                      fontStyle: "normal",
                    }}
                  >
                    Supporter Version
                  </Typography>
                </Box>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ fontWeight: "bold", color: "#f89090" }}
                >
                  $0.99
                </Typography>
                <Typography
                  variant="h7"
                  component="div"
                  sx={{ color: "#dbd7d7" }}
                >
                  / one time fee
                </Typography>
                <Box my={2}>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ color: "#c4c0c0" }}
                  >
                    Join our community and access essential features while
                    contributing to the continuous improvement of our AI model.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    border: "4px solid #f89090",
                    backgroundColor: "#676767", // Custom background color
                    color: "#FFFFFF", // Custom text color
                    "&:hover": {
                      backgroundColor: "#f89090", // Custom hover background color
                    },
                  }}
                  onClick={handleSubmit}
                >
                  Support Us
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
