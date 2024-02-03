import {
  Box,
  Flex,
  Heading,
  Image,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";

import { motion } from "framer-motion";

interface HeroProps {
  videURL: string;
  heroTitle: string;
  icon: ReactNode;
  heroDescription: string;
  heroLead: string;
  heroActionButton: String;
  avatar: String;
  others: String;
  mt: String;
  imageURL: String;
  breadcrumb: string;
}
export const Hero = (props: HeroProps) => {
  const {
    imageURL,
    videURL,
    heroTitle,
    heroDescription,
    heroLead,
    heroActionButton,
    breadcrumb,
    ...rest
  } = props;

  return (
    <Box position="relative" overflow="hidden" bg={"blue.400"} border={"none"}>
      {/* Video Background */}
      {videURL == null ? (
        <>
          <Image
            fallback={
              <SkeletonText size="full" skeletonHeight="30" noOfLines={1} />
            }
            src={imageURL}
            style={{ width: "100%", height: "350px", objectFit: "cover" }}
          />
        </>
      ) : (
        <video
          autoPlay
          loop
          muted
          height={"100%"}
          style={{ width: "100%", height: "800px", objectFit: "cover" }}
        >
          <source src={videURL} type="video/mp4" />
          {/* Add additional video formats (WebM, Ogg) for browser compatibility */}
        </video>
      )}

      <Flex
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        align="center"
        justify="center"
        flexDirection="column"
        color="white"
        zIndex="1"
        p={{ base: 4, md: 8 }}
        textAlign="center"
        px={{ base: 4, md: 20 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Stack
            alignSelf={{ base: "center", md: "center", lg: "center" }}
            justifySelf={{ base: "center", md: "center", lg: "center" }}
            px={{ base: "", md: "250px" }}
            spacing={"5"}
            pt={20}
          >
            <Heading
              fontSize={{ base: "5xl", md: "6xl", lg: "6xl" }}
              px={{ base: "", md: "80px" }}
              textTransform={"uppercase"}
              textAlign={{ base: "center", md: "center", lg: "center" }}
              textShadow={"xl"}
              // color={'blue.300'}
            >
              {heroTitle}
            </Heading>
            <Heading
              as="h1"
              px={{ base: "", md: "150px" }}
              fontSize={{ base: "3xl", md: "3xl", lg: "3xl" }}
              textAlign={{ base: "center", md: "center", lg: "center" }}
            >
              {heroDescription}
            </Heading>
          
              {breadcrumb}
           
            <Text
              fontSize={{ base: "20px", md: "xl", lg: "3xl" }}
              px={{ base: "", md: "250px" }}
              textAlign={{ base: "center", md: "center", lg: "center" }}
              fontStyle={"italic"}
            >
              {heroLead}
            </Text>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={4}
              m={"auto"}
            >
              {heroActionButton}
            </Stack>
          </Stack>
        </motion.div>
      </Flex>
    </Box>
  );
};
