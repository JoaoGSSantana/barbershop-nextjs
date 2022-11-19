import { Handshake, Scissors, UserCircle } from "phosphor-react";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { Button, ButtonGroup } from "@chakra-ui/react";

export type ScheduleData = {
  id?: string;
  client: string;
  service: string;
  date: string;
  time: string;
  barber: string;
};

export function ScheduleCard({
  client,
  service,
  date,
  time,
  barber,
}: ScheduleData) {
  const when = dayjs(date).locale(ptBR).format("DD [de] MMMM [de] YYYY");

  return (
    <div className="flex w-full h-fit min-h-[50px] bg-gray-800 rounded-md shadow-sm shadow-gray-600 p-2">
      <div className="flex flex-col w-full py-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-1 items-center gap-3 w-full h-fit  px-4">
            <div className="flex h-16 w-[64px] items-center justify-center bg-blue-500 rounded-full">
              <UserCircle size={32} color="white" />
            </div>
            <p className="text-white text-lg font-bold">{client}</p>
          </div>
          <div className="flex flex-col justify-center px-4">
            <span className="text-white text-md">Marcado para {when}</span>
            <span className="text-white text-md">ás {time}</span>
          </div>
        </div>

        <div className="w-full h-full grid grid-cols-2 rounded-md p-4 mt-2">
          <div className="flex flex-col gap-1 py-2">
            <div className="flex bg-gray-900 h-fit w-fit py-1 px-2 min-w-[100px] rounded-full items-center justify-center gap-2">
              <Scissors size={16} color="white" />
              <span className="text-white text-sm">{service}</span>
            </div>
            <div className="flex bg-gray-900 h-fit w-fit py-1 px-2 min-w-[100px] rounded-full items-center justify-center gap-2">
              <Handshake size={16} color="white" />
              <span className="text-white text-xs font-bold">
                Barbeiro responsável {barber}
              </span>
            </div>
          </div>
          <ButtonGroup alignItems="flex-end" justifyContent="flex-end" gap={2}>
            <Button colorScheme="green">Atendido </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
