import { useEffect, useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Tabs, TabList, Tab } from "@chakra-ui/react";

import { Calendar, CalendarPlus, Scissors } from "phosphor-react";

import { theme } from "../theme";

import barbershop from "../assets/barbershop.svg";

interface Props {
  context: "index" | "schedule";
}

export function TabNavigationBar(props: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const { colors } = theme;

  const contextIndex = useMemo(() => {
    return {
      index: 0,
      schedule: 1,
    };
  }, []);

  useEffect(() => {
    setTabIndex(contextIndex[props.context]);
  }, [props.context, contextIndex]);

  return (
    <Tabs
      className="flex flex-1 flex-row bg-gray-800 w-full mb-3"
      variant="soft-rounded"
      alignItems="center"
      colorScheme="blackAlpha"
      isFitted
      defaultIndex={contextIndex[props.context]}
      onChange={(index) => setTabIndex(index)}
    >
      <Image
        src={barbershop}
        alt="Barbershop"
        className="w-fit h-[86px] ml-2"
      />

      <TabList>
        <Link className="flex flex-1" href="/">
          <Tab isSelected={tabIndex === 0}>
            <Calendar
              size={28}
              color={tabIndex === 0 ? colors.blue[500] : "white"}
            />
          </Tab>
        </Link>

        <Link className="flex flex-1" href="/schedule">
          <Tab isSelected={tabIndex === 1}>
            <CalendarPlus
              size={28}
              color={tabIndex === 1 ? colors.blue[500] : "white"}
              weight="duotone"
            />
          </Tab>
        </Link>
        <Tab isDisabled>
          <Scissors size={28} color="black" />
        </Tab>
      </TabList>
    </Tabs>
  );
}
