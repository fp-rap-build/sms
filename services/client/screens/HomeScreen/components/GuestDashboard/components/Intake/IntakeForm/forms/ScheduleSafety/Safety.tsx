import { View } from "react-native";

import React from "react";

import { Formik, FieldArray } from "formik";

import TextInput from "../../../../../../../../../components/TextInput";

import * as Yup from "yup";

import { Text } from "native-base";

import getAge from "../../../../../../../../../utils/getAge";

import styled from "styled-components/native";

import Unorderedlist from "react-native-unordered-list";

import Navigation from "../../Navigation";
import { useSelector } from "react-redux";

export default function Belongings({
  nextStep,
  onChange,
  formValues,
  prevStep,
}) {
  //Options for relationship drop down

  const { members } = useSelector((state: any) => state.household);

  let adults = members.filter((mem) => getAge(mem.demographics.dob) >= 18);

  let copyOfAdults = adults.map((mem) => ({
    ...mem,
    signature: "",
  }));

  const initialValues = {
    members: [...copyOfAdults],
  };

  // const validationSchema = Yup.object().shape({
  //   members: Yup.array().of(
  //     Yup.object().shape({
  //       signature: Yup.string().required("Required").nullable(),
  //     })
  //   ),
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
      }) => (
        <View
          style={{
            width: "100%",
          }}
        >
          <Text fontSize="3xl" marginBottom={5}>
            Shelter Schedule, Expectations and Safety Agreement (continued)
          </Text>

          <Spacer />

          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Night Shelter Expectations:
          </Text>

          <Spacer />
          <Spacer />

          <View>
            <Text fontSize={"lg"} fontWeight={"bold"}>
              {" "}
              Everyone sleeps on mats on the floor, so we need to keep the
              floors in the shelter as clean and bug-free as possible. So we do
              NOT allow:
            </Text>

            <Spacer />

            <Unorderedlist>
              <Text fontSize={"md"}>
                {" "}
                Personal bedding or pillows, except 4x4 blanket for child 12 and
                under
              </Text>
            </Unorderedlist>

            <Unorderedlist>
              <Text fontSize={"md"}>
                {" "}
                Food or drink, except baby food or bottled water
              </Text>
            </Unorderedlist>

            <Unorderedlist>
              <Text fontSize={"md"}> Strollers</Text>
            </Unorderedlist>
          </View>

          <Spacer />

          <View>
            <Text fontSize={"lg"} fontWeight={"bold"}>
              {" "}
              We wish to keep the Night Shelter a safe and calming space for
              families. So:
            </Text>

            <Spacer />

            <Unorderedlist>
              <Text fontSize={"md"}>
                {" "}
                There are no designated spots in night shelter.
              </Text>
            </Unorderedlist>

            <Unorderedlist>
              <Text fontSize={"md"}>
                {" "}
                Kids must always be in parents’ line of sight.
              </Text>
            </Unorderedlist>

            <Unorderedlist>
              <Text fontSize={"md"}>
                If using the smoking area, children must accompany parents.
              </Text>
            </Unorderedlist>

            <Unorderedlist>
              <Text fontSize={"md"}>
                Cry room is reserved for upset children during the night to use
                until calm.
              </Text>
            </Unorderedlist>

            <Unorderedlist>
              <Text fontSize={"md"}>
                Respite room is reserved for special accommodations that will
                require Dr written note
              </Text>
            </Unorderedlist>

            <Unorderedlist>
              <Text fontSize={"md"}>
                All guests 16 and older are expected to help clean shelter in
                morning.
              </Text>
            </Unorderedlist>

            <Unorderedlist>
              <Text fontSize={"md"}>
                Please help children under 5 use the restroom to help keep
                restroom clean
              </Text>
            </Unorderedlist>

            <Unorderedlist>
              <Text fontSize={"md"}>
                Yelling, screaming, cursing, and spanking are not acceptable
                forms of discipline at Open Doors and may result in suspension
                from the shelter and/or be reported to Child Services
              </Text>
            </Unorderedlist>
          </View>

          <Spacer />
          <Spacer />

          <Text fontSize={"xl"} fontWeight="bold">
            Signature of all adults in household
          </Text>

          <Spacer />

          <FieldArray name="members">
            {() =>
              values.members.map((ticket, i) => {
                const ticketErrors =
                  (errors.members?.length &&
                    errors.members[i] &&
                    errors.members[i]) ||
                  {};

                const ticketTouched =
                  (touched.members &&
                    touched.members[i] &&
                    touched.members[i]) ||
                  {};

                const ticketValues =
                  (values.members[i] && values.members[i]) || {};

                if (getAge(ticket.demographics.dob) <= 18) return <></>;

                return (
                  <View
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      width: "100%",
                      marginBottom: "3%",
                    }}
                  >
                    <TextInput
                      width="100%"
                      placeholder={`Signature`}
                      onBlur={handleBlur("members")}
                      error={ticketErrors.signature}
                      touched={ticketTouched.signature}
                      value={ticketValues.signature}
                      label={`${values.members[i].demographics.firstName} ${values.members[i].demographics.lastName}`}
                      onChangeText={(value) => {
                        handleSigChange(
                          "signature",
                          value,
                          values,
                          setFieldValue,
                          i
                        );
                      }}
                    />
                  </View>
                );
              })
            }
          </FieldArray>

          <Navigation prevStep={prevStep} handleSubmit={handleSubmit} />
        </View>
      )}
    </Formik>
  );
}

const handleSigChange = (field, value, values, setFieldValue, position) => {
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
  margin-top: 5;

  margin-bottom: 5;
`;
