import { useEffect, useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";

import { TabNavigationBar } from "../components/TabNavigationBar";
import { ScheduleCard, ScheduleData } from "../components/ScheduleCard";

import { api } from "../lib/axios";

interface HomeProps {
  schedulesList: ScheduleData[];
}

export default function Home(props: HomeProps) {
  const [schedules, setSchedules] = useState<ScheduleData[]>([]);

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
          <ScheduleCard key={item?.id} {...item} />
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
