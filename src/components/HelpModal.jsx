import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import { ExpandMoreIcon, HelpOutlineIcon } from ".";

const HelpModal = () => {
  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ mb: "15px" }}
      >
        Help&nbsp;
        <HelpOutlineIcon />
      </Typography>
      <Accordion className="accordionHeader">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>
            I can&apos;t find the link to Github Repository
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="accordionPara">
          <Typography>
            This Project is Closed Source due to its vast nature, and complex
            api usage. This project not only incorporates UI built through
            React, but also widely uses other libraries like Material UI,
            Bootstrap, Framer Motion, Redux for state management etc. as well
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="accordionHeader">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>What is this YouTube clone </Typography>
        </AccordionSummary>
        <AccordionDetails className="accordionPara">
          <Typography>
            This YouTube clone is a web application built with React that mimics
            the core functionalities of YouTube. It includes features like video
            playback, search functionality, dynamic content updates, comments,
            and more, all styled using Material UI (MUI) and Bootstrap. The app
            is hosted on Vercel, offering fast and reliable performance.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="accordionHeader">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>
            What technologies are used in building this YouTube clone?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="accordionPara">
          <Typography>
            This app uses the following technologies:
            <br />
            <ol>
              <li>React Router DOM for routing and navigation.</li>
              <li>
                Material UI (MUI) and Bootstrap for the user interface
                components and styling.
              </li>
              <li>YouTube API for fetching videos and related data. </li>
              <li>Vercel for hosting the app.</li>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="accordionHeader">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Does the app have a mobile-friendly design?</Typography>
        </AccordionSummary>
        <AccordionDetails className="accordionPara">
          <Typography>
            Yes, the app is fully responsive, utilizing Material UI and
            Bootstrap to ensure that it works well on all screen sizes,
            including mobile devices and tablets. The user interface adapts
            dynamically to provide a smooth experience on any device.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="accordionHeader">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>How do I report bugs or issues?</Typography>
        </AccordionSummary>
        <AccordionDetails className="accordionPara">
          <Typography>
            To report bugs or issues, please reach out me at
            gpsingh02414@gmail.com
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded className="accordionHeader">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>
            <b>Hire Me</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="accordionPara">
          <Typography>
            You can reach out to me via multiple platforms -
            <br />
            <Box>
              Email:&nbsp;
              <a
                href="mailto:gpsingh02414@gmail.com"
                className="text-white"
                target="_blank"
              >
                gpsingh02414@gmail.com
              </a>
            </Box>
            <Box>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/gurpreetchadhaeee/"
                className="text-white"
                target="_blank"
              >
                https://www.linkedin.com/in/gurpreetchadhaeee/
              </a>
            </Box>
            <Box>
              {" "}
              Github:{" "}
              <a
                href="https://github.com/GurpreetSingh-Projects"
                className="text-white"
                target="_blank"
              >
                https://github.com/GurpreetSingh-Projects
              </a>
            </Box>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default HelpModal;
