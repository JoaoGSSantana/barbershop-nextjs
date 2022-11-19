import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";

export type FieldTypes =
  | "client"
  | "date"
  | "barber"
  | "time"
  | "service"
  | "all"
  | "tryAgain"
  | "";

type Props = {
  onClose: () => void;
  field: FieldTypes;
};

export function AlertFormError({ onClose, field }: Props) {
  const texts = {
    client: "Cliente inválido",
    date: "Data inválida",
    barber: "Barbeiro inválido",
    time: "Horário inválido",
    service: "Serviço inválido",
    all: "Algum dos campos estão incorretos",
    tryAgain: "Não possível concluir",
  };

  return (
    <Alert status="error" variant="left-accent">
      <AlertIcon />
      <AlertTitle>{texts[field as keyof typeof texts]}</AlertTitle>
      <AlertDescription>Verifique e/ou tente novamente!</AlertDescription>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-10}
        top={0}
        onClick={onClose}
      />
    </Alert>
  );
}
