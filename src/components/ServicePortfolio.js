import React from "react";
import { Box, Container, Heading, Image, Text, VStack } from "@chakra-ui/react";

const ServicePortfolio = ({ services }) => {
  return (
    <Container maxW="container.xl" py={10}>
      <Heading as="h2" size="xl" textAlign="center" mb={8}>
        Our Services
      </Heading>
      <VStack spacing={8} align="center">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </VStack>
    </Container>
  );
};

const ServiceCard = ({ service }) => {
  return (
    <Box
      w="300px"
      p={4}
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Image src={service.image} alt={service.title} h="150px" objectFit="cover" />
      <Heading as="h3" size="md" mt={4}>
        {service.title}
      </Heading>
      <Text color="gray.600" mt={2}>
        {service.description}
      </Text>
    </Box>
  );
};

export default ServicePortfolio;
