import { AlertDialog,AlertDialogOverlay,AlertDialogContent,AlertDialogHeader,AlertDialogBody,AlertDialogFooter,Button } from "@chakra-ui/react"

export default function ConfirmationBox({title, message, isOpen, onClose, onConfirm}) {
  return (
    <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>
              {message}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button  onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  )
}
