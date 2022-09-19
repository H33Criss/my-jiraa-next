import { Box } from "@mui/material"
import Head from "next/head"
import { FC, ReactNode, useState } from "react"
import { Navbar, Sidebar } from "../ui"

interface Props {
    title?: string,
    children: ReactNode
}

export const Mainlayout: FC<Props> = ({ title = 'Home jira', children }) => {
    const maxWidth = '210px';

    return (
        <Box >
            <Head>
                <title>{title}</title>
                <meta property="og:type" content="website" />

            </Head>

            <Navbar maxWidth={maxWidth} />
            <Sidebar maxWidth={maxWidth} />

            <Box sx={{ padding: '15px 30px', marginLeft: { md: maxWidth } }}>
                {children}
            </Box>
        </Box>
    )
}
