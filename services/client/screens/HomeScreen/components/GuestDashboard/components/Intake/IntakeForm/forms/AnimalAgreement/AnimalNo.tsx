import { View } from "react-native";

import React from "react";

import { Formik } from "formik";

import TextInput from "../../../../../../../../../components/TextInput";

import * as Yup from "yup";

import { Text } from "native-base";

import getAge from "../../../../../../../../../utils/getAge";

import styled from "styled-components/native";

import CheckboxInput from "../../../../../../../../../components/CheckboxInput";

import Navigation from "../../Navigation";
import { useSelector } from "react-redux";

export default function RaceEthnicityInfo({
  nextStep,
  prevStep,
}) {

  const { members } = useSelector((state: any) => state.household);

  let adults = members.filter((mem) => getAge(mem.demographics.dob) >= 18);

  let copyOfAdults = adults.map((mem) => ({
    ...mem,
    signature: "",
  }));

  const initialValues = {
    animalYes: false,
    animalNo: false,
    signature: "",

    members: [...copyOfAdults],
  };

  // const validationSchema = Yup.object().shape({
  //   animalNo: Yup.boolean(),
  //   animalYes: Yup.boolean(),
  //   signature: Yup.string().when("animalNo", {
  //     is: true,
  //     then: () => Yup.string().required("Required"),
  //   }),
  // });

  function onSubmit(fields) {

    nextStep();
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({
        errors,
        values,
        touched,
        handleBlur,
        setFieldValue,
        handleSubmit,
        handleChange,
      }) => (
        <View
          style={{
            width: "100%",
          }}
        >
          <Text fontSize="3xl">Open Doors Family Shelter Animal Agreement</Text>

          <Spacer />

          <Text fontSize={"md"}>
            {" "}
            **Open Doors allows up to <Text>two</Text> pets per family in the
            shelter. Pets that are allowed are limited to{" "}
            <Text>CATS AND DOGS</Text> at this time as our shelter does not have
            accommodations set up for other types of animals. No new animals may
            be brought in after the initial intake.***
          </Text>

          <Spacer />

          <Text fontSize={"md"} fontWeight="bold">
            Is your family bringing an animal with you into the shelter at the
            time of your intake?
          </Text>

          <Spacer />

          <View>
            <CheckboxInput
              onChange={(name, checked) => {
                setFieldValue("animalNo", false);
                setFieldValue(name, checked);
              }}
              name="animalYes"
              defaultIsChecked={values.animalYes}
            >
              Yes
            </CheckboxInput>
            <Text>
              <Text fontWeight={"bold"}>If so,</Text> please fill out the
              agreement on the next page and sign.
            </Text>
          </View>

          <Spacer />

          <View>
            <CheckboxInput
              onChange={(name, checked) => {
                setFieldValue("animalYes", false);
                setFieldValue(name, checked);
              }}
              name="animalNo"
              defaultIsChecked={values.animalNo}
            >
              No
            </CheckboxInput>
            <Text>
              <Text fontWeight={"bold"}>If NOT</Text>, please sign below to
              indicate that you understand you will not be allowed to bring an
              animal in the shelter after this point.
            </Text>
          </View>

          <Spacer />

          <TextInput
            width="100%"
            placeholder="First & last name"
            name="dateLastIncident"
            onBlur={handleBlur("signature")}
            error={errors.signature}
            onChangeText={handleChange("signature")}
            touched={touched.signature}
            value={values.signature}
            marginBottom={"20px"}
          />

          <Navigation prevStep={prevStep} handleSubmit={handleSubmit} />
        </View>
      )}
    </Formik>
  );
}

const handleCheckboxChange = (
  field,
  value,
  values,
  setFieldValue,
  position
) => {
  return setFieldValue("members", [
    ...values.members.map((member, i) => {
      if (i == position) {
        member[field] = value;
      }

      return member;
    }),
  ]);
};

const Spacer = styled.View`
  margin-top: 10;

  margin-bottom: 10;
`;


