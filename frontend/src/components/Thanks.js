import React from "react";
import styled from "styled-components";

const Thanks = () => {
  return (
    <Wrapper>
      <Paragraph>
        Congratulations to everyone who has made it this far and thank you for
        the amazing journey this past 3 months, it has been an absolute pleasure
        coding along side all of you. A giant thank you to the instructors, Rony
        Kordahi, Riley McMaster, Bobby Connolly as well as members of the
        administrative and support staff at Journey. We literally could not have
        done it without you guys.
      </Paragraph>
      <Paragraph>
        Further, another huge thank you to all of CB-WD-9 survivors. Thanks
        Alexandre "Sasha" Tchouprov for the exercising tips, Anissah Abbas for
        the career study sessions, Benjamin Russell for the sarcasm, Brandon Cha
        for the random trivias, Chris Kossivas for an amazing voice, Dimitri
        Creticos for the beard, Elie Wanna for the mic, Gerry Babuin for the
        design feedbacks, Jacob Veilleux for laughing at my error message,
        Jeremie Legault for the music video, Jinsun for the Liu Kang
        impersonation, Kishant Kanaka for beating me to every workshops, Maicol
        Ospina for the music, Maxime Cloutier for the LinkedIn insider info,
        Maxime Gaillard for the tattoo artist referral and burp, Mohammad
        Akbarzadeh for being handsome af, Muhaned Marafawi for the VS Code
        theme, Noel Blaise for being an inspiration, Patrick Gervais for being
        Patrick Gervais, Piyush Patel for the insightful questions, Preet
        Dhillon for being a bro and carrying us in HOTS, Ranveer Gill for being
        a stud, Ruanqin Zhao for the wonderful group project backend, Viktoriia
        Kulko for the adorable accent. And finally, thank you Jena Massabni, for
        being in my life, you make me feel like the luckiest guy alive.
      </Paragraph>
      <Paragraph>
        I hope I didn't miss anyone but it's 3:30AM and I'm slightly
        intoxicated.
      </Paragraph>
      <Paragraph style={{ textAlign: "right" }}>
        Thank you CB-WD-9,
        <br />
        Ngoc Duy Anh Nguyen
      </Paragraph>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: var(--margin-page);
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 20px;
  color: var(--color-text);
  padding-bottom: 70px;
`;

const Paragraph = styled.p`
  width: 100%;
  text-align: left;
  line-height: 120%
`;

export default Thanks;
