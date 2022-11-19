import { useEffect, useState } from "react";
import { Box, Flex, Heading, useToast } from "@chakra-ui/react";

import { TabNavigationBar } from "../components/TabNavigationBar";
import { ScheduleCard, ScheduleData } from "../components/ScheduleCard";

import { api } from "../lib/axios";

interface HomeProps {
  schedulesList: ScheduleData[];
}

export default function Home(props: HomeProps) {
  const [schedules, setSchedules] = useState<ScheduleData[]>([]);

  const toast = useToast();

  async function handleToMeet(id: string) {
    try {
      await api.delete(`/schedules/${id}`);

      toast({
        title: "Atendido com sucesso!",
        description: "Atualize para a página, para ter sua lista atualizada.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Não foi possível marcar como atendido!",
        description: "Por favor, tente novamente mais tarde.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    setSchedules(props.schedulesList);
  }, [props.schedulesList]);

  return (
    <Flex className="flex flex-col items-center pb-3">
      <TabNavigationBar context="index" />
      <Box className="py-3">
        <Heading className="text-white text-5xl font-light uppercase">
          Olá, Bem-vindo.
        </Heading>
        <h1 className="text-gray-700 text-2xl font-light uppercase">
          Acompanhe seus agendamentos aqui!
        </h1>
      </Box>

      <Box className="flex  flex-col gap-3 pt-2 w-[50%]">
        {schedules.map((item) => (
          <ScheduleCard
            key={item.scheduleID}
            {...item}
            onToMeet={() => handleToMeet(item.scheduleID)}
          />
        ))}
      </Box>
    </Flex>
  );
}

export const getServerSideProps = async () => {
  const [schedulesResponse] = await Promise.all([api.get("/schedules")]);

  return {
    props: {
      schedulesList: schedulesResponse.data,
    },
  };
};
