import { FormEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";

import { AlertFormError, FieldTypes } from "../components/AlertFormErro";
import { ScheduleData } from "../components/ScheduleCard";

import { api } from "../lib/axios";
import { TabNavigationBar } from "../components/TabNavigationBar";

type Barber = {
  barberID: string;
  barber: string;
  createdAt: string;
};

type Services = {
  serviceID: string;
  service: string;
};

interface ScheduleProps {
  barbersList: Barber[];
  servicesList: Services[];
}

export default function Schedule(props: ScheduleProps) {
  const [scheduling, setScheduling] = useState<ScheduleData>(
    {} as ScheduleData
  );
  const [isError, setIsError] = useState<FieldTypes>("");
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [services, setServices] = useState<Services[]>([]);

  const toast = useToast();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!scheduling) {
      return setIsError("all");
    }

    const emptyValue = Object.entries(scheduling).find((item) => !item[1]);
    console.log("emptyValue", emptyValue);

    if (emptyValue && emptyValue.length > 0) {
      return setIsError(emptyValue[0] as FieldTypes);
    }

    try {
      const response = await api.post("/schedules/", { ...scheduling });

      if (response) {
        toast({
          title: "Agendado com sucesso!",
          description:
            "Retorne para a tela de agendamentos para ver seu novo agendamento.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else throw new Error("");
    } catch (error) {
      console.log(error);
      setIsError("tryAgain");
    }
  }

  function handleClose() {
    setIsError("");
  }

  useEffect(() => {
    setBarbers(props.barbersList);
    setServices(props.servicesList);
  }, [props.barbersList, props.servicesList]);

  return (
    <Flex className="flex flex-col items-center gap-3">
      <TabNavigationBar context="schedule" />
      <Box className="flex flex-col bg-gray-800 rounded-md shadow-sm shadow-black w-[50%] h-[60%] p-5 items-center justify-center mb-4 gap-4">
        {isError && <AlertFormError onClose={handleClose} field={isError} />}
        <Heading className="text-blue-500" size="lg">
          Novo agendamento
        </Heading>
        <h1 className="text-gray-100 text-xl font-light uppercase mb-3">
          Preencha o formulário abaixo para criar um novo agendamento.
        </h1>
        <Box className="flex flex-col w-[70%] items-stretch gap-1">
          <FormControl isInvalid={isError === "client"}>
            <FormLabel className="text-white text-xs">Cliente</FormLabel>
            <Input
              type="name"
              placeholder="John Doe"
              height={50}
              textColor="gray.900"
              borderColor="blue.600"
              focusBorderColor="green.500"
              bg="white"
              value={scheduling.client}
              onChange={(event) =>
                setScheduling((prevState) => ({
                  ...prevState,
                  client: event.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl isInvalid={isError === "date"}>
            <FormLabel className="text-white text-xs">Data</FormLabel>
            <Input
              type="date"
              placeholder="DD/MM/YY"
              height={50}
              textColor="gray.900"
              borderColor="blue.600"
              focusBorderColor="green.500"
              bg="white"
              value={scheduling.date}
              onChange={(event) =>
                setScheduling((prevState) => ({
                  ...prevState,
                  date: event.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl isInvalid={isError === "time"}>
            <FormLabel className="text-white font-normal">Horário</FormLabel>
            <Input
              type="time"
              placeholder="HH:MM"
              height={50}
              textColor="gray.900"
              borderColor="blue.600"
              focusBorderColor="green.500"
              bg="white"
              value={scheduling.time}
              onChange={(event) =>
                setScheduling((prevState) => ({
                  ...prevState,
                  time: event.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl isInvalid={isError === "barber"}>
            <FormLabel className="text-white font-normal">Barbeiro</FormLabel>
            <Select
              placeholder="Selecione um barbeiro"
              height={50}
              textColor="gray.900"
              borderColor="blue.600"
              focusBorderColor="green.500"
              bg="white"
              iconColor="black"
              value={scheduling.barber}
              onChange={(event) =>
                setScheduling((prevState) => ({
                  ...prevState,
                  barber: event.target.value,
                }))
              }
            >
              {barbers.map((barber) => (
                <option
                  key={barber.barberID}
                  style={{ backgroundColor: "transparent" }}
                  value={barber.barber}
                >
                  {barber.barber}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isInvalid={isError === "service"}>
            <FormLabel className="text-white font-normal">Serviço</FormLabel>
            <Select
              placeholder="Selecione um serviço"
              height={50}
              textColor="gray.900"
              borderColor="blue.600"
              focusBorderColor="green.500"
              bg="white"
              iconColor="black"
              value={scheduling.service}
              onChange={(event) =>
                setScheduling((prevState) => ({
                  ...prevState,
                  service: event.target.value,
                }))
              }
            >
              {services.map((service) => (
                <option
                  key={service.serviceID}
                  style={{ backgroundColor: "transparent" }}
                  value={service.service}
                >
                  {service.service}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="outline"
            borderColor="blue.500"
            color="blue.500"
            height={50}
            mt={8}
            _hover={{
              backgroundColor: "blue.500",
              borderColor: "blue.500",
              color: "white",
            }}
            onClick={handleSubmit}
          >
            Marcar atendimento
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}

export const getServerSideProps = async () => {
  const [barbersResponse, servicesResponse] = await Promise.all([
    api.get("/barbers"),
    api.get("/services"),
  ]);

  return {
    props: {
      barbersList: barbersResponse.data,
      servicesList: servicesResponse.data,
    },
  };
};
