import React, { useEffect, useState, useRef } from "react";
import { ScrollView } from "react-native";
import { useCurrentHousehold } from "../../../../../../api/hooks";
import useUpdateHousehold from "../../../../../../api/hooks/useUpdateHousehold";
import useStep from "../../../../../../hooks/useStep";
import IntakeForm from "./IntakeForm";
import steps from "./steps";

const IntakeScreen = () => {
  const householdQuery = useCurrentHousehold();

  const { mutate: updateHousehold } = useUpdateHousehold();

  const { household, members } = householdQuery.data;

  const { step, navigation: formNavigator } = useStep({
    initialStep: household.lastFormVisited || "IntakeStart",

    steps,
  });

  const nextStep = () => formNavigator.next();
  const prevStep = () => formNavigator.previous();
  const setStep = (step) => formNavigator.go(step);

  const props = {
    step,
    setStep,
    nextStep,
    prevStep,
    household,
    members,
  };

  const scrollRef = useRef();

  useEffect(() => {
    updateHousehold({
      householdId: household._id,
      info: { lastFormVisited: step.id },
    });

    scrollRef.current.scrollTo({ y: 0 });
  }, [step]);

  return (
    <ScrollView ref={scrollRef}>
      <IntakeForm {...props} />
    </ScrollView>
  );
};

export default IntakeScreen;
