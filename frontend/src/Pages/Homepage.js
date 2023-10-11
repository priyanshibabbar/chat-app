import { Box, Container, Text, Tabs, TabList, Tab, TabPanel, TabPanels } from "@chakra-ui/react";
import React from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup"


const Homepage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        textAlign={"center"}
        p="12px"
        bg="white"
        w="100%"
        m="20px"
        borderRadius="10px"
      >
        <Text fontSize="4xl" fontFamily={"Work sans"} color={"black"}>
          Study Corner
        </Text>
      </Box>

      <Box bg={"white"} w={"100%"} p={4} borderRadius="10px">
        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList mb={'1em'}>
            <Tab width={'50%'}>Login</Tab>
            <Tab width={'50%'}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>
                <Login />
              </p>
            </TabPanel>
            <TabPanel>
              <p>
                <Signup />
              </p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
