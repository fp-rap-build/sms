import { View } from "react-native";
import React from "react";

import { Formik, FieldArray } from "formik";

import TextInput from "../../../../../../../../components/TextInput";

import * as Yup from "yup";

import { Text } from "native-base";

import getAge from "../../../../../../../../utils/getAge";

import styled from "styled-components/native";

import Navigation from "../Navigation";
import { useSelector } from "react-redux";

export default function Belongings({ nextStep, formValues, prevStep }) {
  //Options for relationship drop down

  const { members } = useSelector((state: any) => state.household);


  let adults = members.filter((mem) => getAge(mem.demographics.dob) >= 18);

  let copyOfAdults = adults.map((mem) => ({
    ...mem,
    signature: "",
  }));

  const initialValues = {
    sig1: "",
    in1: "",
    in2: "",
    in3: "",
    in4: "",
    in5: "",

    members: [...copyOfAdults],
  };

  // const validationSchema = Yup.object().shape({
  //   sig1: Yup.string().required("Required"),
  //   in1: Yup.string().required("Required"),
  //   in2: Yup.string().required("Required"),
  //   in3: Yup.string().required("Required"),
  //   in4: Yup.string().required("Required"),
  //   in5: Yup.string().required("Required"),

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
        handleChange,
      }) => (
        <View
          style={{
            width: "100%",
          }}
        >
          <Text fontSize="3xl" marginBottom={5}>
            Open Doors Personal Belongings Agreement
          </Text>

          <Spacer />

          <Text fontSize="md">
            It is our desire at Open Doors to provide you with a safe place for
            you, your children and your belongings while you are experiencing
            homelessness and staying in our shelter - We want you to have a
            place to store the belongings you will need day-to-day that is safe
            and clean!
          </Text>

          <Spacer />

          <Text fontSize="md">
            In order to accomplish this, it is necessary to have policies in
            place regarding personal belongings. We{" "}
            <Text fontWeight={"bold"}>never</Text> want to get rid of someone’s
            personal things and this happens only as a last resort at our
            shelter.
          </Text>

          <Spacer />

          <View>
            <Text fontSize="md">
              I, an Open Doors Guest, agree to the following terms and
              conditions for storing and caring for my personal and family
              belongings.
            </Text>
            <TextInput
              width="100%"
              placeholder="First & last name"
              name="dateLastIncident"
              onBlur={handleBlur("sig1")}
              error={errors.sig1}
              onChangeText={handleChange("sig1")}
              touched={touched.sig1}
              value={values.sig1}
              marginBottom={"20px"}
            />
          </View>

          <View>
            <Text fontSize="md">
              I understand that Open Doors is not liable for any items lost,
              damaged or stolen during my stay at Open Doors and I understand
              the importance of limiting items I bring with me to the shelter as
              well as keeping valuable personal items such as purses and phones
              with me at all times.
            </Text>
            <TextInput
              width="100%"
              placeholder="Initials"
              name="dateLastIncident"
              onBlur={handleBlur("in1")}
              error={errors.in1}
              onChangeText={handleChange("in1")}
              touched={touched.in1}
              value={values.in1}
              marginBottom={"20px"}
            />
          </View>

          <View>
            <Text fontSize="md">
              I understand that if I bring valuable items to the shelter with me
              that there is a possibility of my items being lost, stolen or
              damaged and Open Doors is NOT responsible for replacing them.
            </Text>
            <TextInput
              width="100%"
              placeholder="Initials"
              name="dateLastIncident"
              onBlur={handleBlur("in2")}
              error={errors.in2}
              onChangeText={handleChange("in2")}
              touched={touched.in2}
              value={values.in2}
              marginBottom={"20px"}
            />
          </View>

          <View>
            <Text fontSize="md">
              I understand that I am responsible for keeping my things cleaned
              up and stored properly within the shelter. I will keep all of my
              clothing in bags and stored in designated areas.
            </Text>
            <TextInput
              width="100%"
              placeholder="Initials"
              name="dateLastIncident"
              onBlur={handleBlur("in3")}
              error={errors.in3}
              onChangeText={handleChange("in3")}
              touched={touched.in3}
              value={values.in3}
              marginBottom={"20px"}
            />
          </View>

          <View>
            <Text fontSize="md">
              I understand that belongings left unattended in Day or Night
              Shelter will be donated or disposed of after 24 hours.
            </Text>
            <TextInput
              width="100%"
              placeholder="Initials"
              name="dateLastIncident"
              onBlur={handleBlur("in4")}
              error={errors.in4}
              onChangeText={handleChange("in4")}
              touched={touched.in4}
              value={values.in4}
              marginBottom={"20px"}
            />
          </View>

          <View>
            <Text fontSize="md">
              I understand that if I am caught stealing another guests personal
              belongings I will have to speak with the Open Doors director and
              may be terminated from the program. Please respect your fellow
              guests.
            </Text>
            <TextInput
              width="100%"
              placeholder="Initials"
              name="dateLastIncident"
              onBlur={handleBlur("in5")}
              error={errors.in5}
              onChangeText={handleChange("in5")}
              touched={touched.in5}
              value={values.in5}
              marginBottom={"20px"}
            />
          </View>

          <Text fontSize={"xl"} marginBottom={5}>
            Signature of all adults in household
          </Text>

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
                      marginBottom={"20px"}
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
  margin-top: 10;

  margin-bottom: 10;
`;
