import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

export default function ChakraModal({title, isOpen, onClose,children, size='md',maxW="500px"}) {
  const Body =  <span>{children}</span>

  return (
    <div>
    
          <Modal isOpen={isOpen} onClose={onClose} size={size}>
            <ModalOverlay />
            <ModalContent maxW={size != 'full' ? maxW : ''}>
              <ModalHeader>{title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {Body}
              </ModalBody>
{/*                 
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
              </ModalFooter> */}
            </ModalContent>
          </Modal>
    </div>
  )
}
