import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';



const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


function SwipeableTextMobileStepper() {
    const images = [
        {
          image: "https://cdn1.matadornetwork.com/blogs/1/2018/02/Side-view-of-the-Taj-Mahal.jpg",
          caption: "Taj Mahal, India"
        },
        {
          image: "https://d36tnp772eyphs.cloudfront.net/blogs/1/2018/02/Christ-the-Redeemer.jpg",
          caption: "Christ the Redeemer, Brazil"
        },
        {
          image: "https://cdn1.matadornetwork.com/blogs/1/2016/03/petra-jordan9.jpg",
          caption: "Petra, Jordan"
        },
        {
          image: "https://cdn1.matadornetwork.com/blogs/1/2018/02/Great-Wall-of-China-view.jpg",
          caption: "The Great Wall of China"
        },
        {
          image: "https://d36tnp772eyphs.cloudfront.net/blogs/1/2018/02/Colosseum.jpg",
          caption: "The Colosseum, Rome"
        },
        {
          image: "https://d36tnp772eyphs.cloudfront.net/blogs/1/2018/02/Inside-Machu-Picchu.jpg",
          caption: "Machu Picchu, Peru"
        },
        {
          image: "https://cdn1.matadornetwork.com/blogs/1/2018/02/Temple-of-warriors-at-Chichen-Itza.jpg",
          caption: "Chichén Itzá, Mexico"
        },
      ]
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStepChange = (step) => {
      setActiveStep(step);
    };
  
    
    return (
      <Box sx={{ maxWidth: 1000, flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
            marginBottom:"1rem"
          }}
        > 
        <Typography variant='h4'>Seven Wonders of the World</Typography>
          <Typography>{images[activeStep].caption}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 400,
                    display: 'block',
                    maxWidth: 1000,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={step.image}
                  alt={step.caption}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeftIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRightIcon />
              ) : (
                <KeyboardArrowLeftIcon />
              )}
              Back
            </Button>
          }
        />
      </Box>
    );
  }

  export default SwipeableTextMobileStepper;