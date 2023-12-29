import {Box, Button, Grid, Link, Tab, Tabs} from "@mui/material";
import _ from "lodash";
import {SyntheticEvent, useEffect, useState} from "react";

import CodeEditor from "./CodeEditor";

/**
 * Code editor tabs.
 *
 * @constructor
 *
 * @since 1.0.0
 */
export function CodeEditorTabs() {
    const [tabs, setTabs] = useState([{
        id: 0,
        name: `Editor ${_.random(1000, 9999)}`,
        component: (
            <CodeEditor/>
        ),
    }]);
    const [currentTab, setCurrentTab] = useState(0);

    /**
     * Add tab.
     *
     * @since 1.0.0
     */
    const addTab = () => {
        const nextId = tabs[tabs.length - 1].id + 1;
        const randomNumber = _.random(1000, 9999);
        const newTab = {
            id: nextId,
            name: `Editor ${randomNumber}`,
            component: (
                <CodeEditor/>
            ),
        };

        // Add a new tab.
        setTabs([...(tabs), newTab]);

        // Move current view to recently added tab.
        setCurrentTab(tabs.length); // Gets length before tab created, so no minus needed.
    };

    /**
     * Delete tab.
     *
     * @param {{ id: number, name: string, component: JSX.Element }} theTab - The tab.
     *
     * @since 1.0.0
     */
    const deleteTab = (theTab: { id: number, name: string, component: JSX.Element }) => {
        // Don't allow user to delete last available tab.
        if (tabs.length === 1) {
            return;
        }

        setTabs(tabs.filter((tab) => !_.isEqual(tab, theTab)));

        // If current tab is to the right of the deleted tab.
        if (currentTab > _.findIndex(tabs, theTab)) {
            setCurrentTab(currentTab - 1);
        }

        // If deleting the last tab and index of current tab is the deleted tab.
        if (
            _.findIndex(tabs, theTab) === tabs.length - 1
            && currentTab === _.findIndex(tabs, theTab)
        ) {
            setCurrentTab(_.findIndex(tabs, theTab) - 1);
        }
    };

    /**
     * Tab on change.
     *
     * @param {SyntheticEvent} event    - Event.
     * @param {any}            newValue - New value.
     *
     * @since 1.0.0
     */
    const tabOnChange = (event: SyntheticEvent, newValue: any) => {
        // Prevents tab change if user intended to click on the "✕" link inside button.
        if (_.get(event, ['target', 'localName']) === 'button') {
            setCurrentTab(newValue);
        }
    };

    useEffect(() => {
        console.log('tabs changed', currentTab);
    }, [currentTab]);

    return (
        <>
            <Box>
                <Grid container>
                    <Grid item xs={11}>
                        <Tabs
                            value={currentTab}
                            onChange={(event, newValue) => tabOnChange(event, newValue)}
                            variant="scrollable"
                            scrollButtons={false}
                        >
                            {
                                tabs.map((tab) => (
                                    <Tab
                                        key={tab.id}
                                        label={tab.name}
                                        icon={(
                                            <Link
                                                onClick={() => deleteTab(tab)}
                                                sx={{
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                ✕
                                            </Link>
                                        )}
                                        iconPosition="end"
                                        sx={{
                                            minHeight: 48,
                                        }}
                                    />
                                ))
                            }
                        </Tabs>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            sx={{
                                backgroundColor: '#1e1e1e',
                                color: '#fff',
                                width: '100%',
                                fontSize: 21,
                                borderRadius: 0,
                                '&:hover': {
                                    backgroundColor: '#333',
                                },
                            }}
                            onClick={() => addTab()}
                        >
                            +
                        </Button>
                    </Grid>
                </Grid>
                {
                    tabs.map((tab) => {
                        return (
                            <Box key={tab.id} hidden={currentTab !== _.findIndex(tabs, tab)}>
                                {tab.component}
                            </Box>
                        );
                    })
                }
            </Box>
        </>
    );
}
