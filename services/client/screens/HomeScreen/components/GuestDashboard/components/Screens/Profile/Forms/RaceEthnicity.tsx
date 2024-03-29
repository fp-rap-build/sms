import { View } from "react-native";
import React from "react";

import { Formik, FieldArray } from "formik";

import * as Yup from "yup";

import { Button, Text } from "native-base";

import CheckboxInput, {
  CheckboxGroup,
} from "../../../../../../../../components/CheckboxInput";
import { updateMembers } from "../../../../../../../../api/members";
import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import { setMembers } from "../../../../../../../../state/slices/householdSlice";
import { ScrollView } from "react-native-gesture-handler";
import useUpdateHousehold from "../../../../../../../../api/hooks/useUpdateHousehold";
import { useCurrentHousehold } from "../../../../../../../../api/hooks";
import { useUpdateMembers } from "../../../../../../../../api/hooks/useMembers";

//Options for race
const options = [
  "Hispanic/Latino",
  "American Indian or Alaska Native",
  "Asian",
  "Black or African American",
  "Native Hawaiian or Pacific Islander",
  "White",
  "Unknown",
  "Decline to Answer",
];

export default function RaceEthnicityInfo({ navigation }) {
  //Options for relationship drop down;

  const {
    data: { members, household },
  } = useCurrentHousehold();

  const { mutate: updateMembers } = useUpdateMembers();

  const initialValues = {
    members,
  };

  async function onSubmit(fields) {
    updateMembers(
      { householdId: household._id, members: fields.members },
      { onSuccess: () => navigation.navigate("Profile") }
    );
  }

  const genderOptions = ["Male", "Female", "Decline to Answer"];

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ errors, values, touched, setFieldValue, handleSubmit }) => (
        <ScrollView
          style={{
            width: "100%",
            padding: 10,
          }}
        >
          <Text fontSize="3xl">Ethnicity info</Text>

          <Text fontSize={"xl"} marginBottom="1%">
            Please answer the following questions about race. Check all that
            apply for EACH family member.
          </Text>

          <FieldArray name="members">
            {() =>
              values.members.map((ticket, i) => {
                const ticketErrors =
                  (errors.members?.length &&
                    errors.members[i] &&
                    errors.members[i].demographics) ||
                  {};
                const ticketTouched =
                  (touched.members &&
                    touched.members[i] &&
                    touched.members[i].demographics) ||
                  {};

                const ticketValues =
                  (values.members[i] && values.members[i].demographics) || {};

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
                    <Text
                      fontSize={"2xl"}
                      marginTop="2%"
                      marginBottom="1%"
                    >{`${values.members[i].demographics.firstName}`}</Text>

                    <CheckboxGroup
                      error={ticketErrors.race}
                      touched={ticketTouched.race}
                      onChange={(name, value) => {
                        setFieldValue("members", [
                          ...values.members.map((member, key) => {
                            let races = member.demographics.race;
                            if (key == i) {
                              if (races.includes(name)) {
                                member.demographics.race = races.filter(
                                  (race) => race !== name
                                );
                              } else {
                                member.demographics.race.push(name);
                              }
                            }

                            return member;
                          }),
                        ]);
                      }}
                    >
                      {options.map((opt) => (
                        <CheckboxInput
                          defaultIsChecked={values.members[
                            i
                          ].demographics.race.includes(opt)}
                          name={opt}
                        >
                          {opt}
                        </CheckboxInput>
                      ))}
                    </CheckboxGroup>
                  </View>
                );
              })
            }
          </FieldArray>
          <Button onPress={() => handleSubmit()}>UPDATE</Button>
        </ScrollView>
      )}
    </Formik>
  );
}
