import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { StyledContainer } from "../Utils/StyledContainer";

export function History() {
    const session = useLoaderData();
    console.log(session);

    const allSession = session?.map((s, index) => (
        <TimelineItem>
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Link
                    to={s}
                    style={{ textDecoration: "none", color: "#153fac" }}
                >
                    {index === 0
                        ? "You were here before this"
                        : `${index} navigation ago`}
                </Link>
            </TimelineContent>
        </TimelineItem>
    ));
    return (
        <StyledContainer style={{ display: "flex", flexDirection: "column" }}>
            <Timeline position="alternate">{allSession}</Timeline>
        </StyledContainer>
    );
}
