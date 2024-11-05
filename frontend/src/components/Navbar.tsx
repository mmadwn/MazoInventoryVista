import { Box, Flex, Text } from "@radix-ui/themes"

const Navbar = () => {
  return (
    <Box p="4" style={{ borderBottom: '1px solid #eaeaea' }}> 
      <Flex justify="between" align="center">
        <Text size="5" weight="bold">My App</Text>
      </Flex>    
    </Box>
  )
}

export default Navbar
