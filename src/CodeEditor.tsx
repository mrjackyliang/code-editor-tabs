import MonacoEditor from '@monaco-editor/react';
import {Box} from "@mui/material";
import * as React from 'react';

function CodeEditor(): React.ReactElement {
    return (
        <Box
            sx={{
                height: 500,
            }}
        >
            <MonacoEditor
                height="100%"
                defaultLanguage="sql"
                theme="vs-dark"
                onChange={(value) => console.log('monaco changed', value)}
                options={{
                    dragAndDrop: false,
                    wordWrap: 'on',
                    inlineSuggest: {
                        enabled: true,
                        mode: 'subword'
                    },
                }}
            />
        </Box>
    );
}

export default CodeEditor;
