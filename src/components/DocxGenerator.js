import React from 'react';
import { saveAs } from 'file-saver';
import * as docx from 'docx';
import { Button } from '@chakra-ui/react';
import axios from 'axios';

const DynamicDocxGenerator = ({ data }) => {



    const generate = async () => {

        const doc = new docx.Document({
            sections: [
                {
                    headers: {
                        default: new docx.Header({

                            children: [
                                new docx.Paragraph({
                                    font: 'Century Gothic',
                                    size: 30,
                                    bold: true,
                                    // heading: docx.HeadingLevel.HEADING_1,
                                    alignment: docx.AlignmentType.CENTER,
                                    children: [
                                        new docx.TextRun({
                                            text: 'LITMUS SERVICES LIMITED',
                                            bold: true,
                                            color: '#000fff',
                                            font: 'Century Gothic',
                                            size: 45
                                        }),
                                    ]
                                }),
                                new docx.Paragraph({
                                    alignment: docx.AlignmentType.CENTER,
                                    children: [
                                        new docx.TextRun({
                                            text: 'Sherbourne House, Humber Avenue, Coventry, West Midlands,',
                                            bold: true,
                                            font: 'Century Gothic',
                                            size: 20
                                        }),
                                    ]
                                }),
                                new docx.Paragraph({
                                    alignment: docx.AlignmentType.CENTER,
                                    children: [
                                        new docx.TextRun({
                                            text: 'England, United Kingdom. CVI 2AQ',
                                            bold: true,
                                            font: 'Century Gothic',
                                            size: 20
                                        }),
                                    ]
                                }),
                                new docx.Paragraph({
                                    alignment: docx.AlignmentType.CENTER,
                                    children: [
                                        new docx.TextRun({
                                            text: 'www.litmusservices.co.uk | jobs@litmusservices.co.uk | 02080797305',
                                            bold: true,
                                            font: 'Century Gothic',
                                            size: 20
                                        }),
                                    ]
                                }),
                            ],
                        }),
                    },
                    // footers: {
                    //     default: new docx.Footer({
                    //         children: [
                    //             new docx.Paragraph({
                    //                 text: "Hey you",
                    //                 numbering: {
                    //                     reference: "my-crazy-numbering",
                    //                     level: 0,
                    //                 },
                    //             }),
                    //         ],
                    //     }),
                    // },


                    properties: {},
                    children: [
                        new docx.Paragraph({
                            spacing: {
                                before: 300,
                            },
                            children: [
                                new docx.TextRun({
                                    text: data.confidential,
                                    bold: true,
                                    color: '#ff0000',
                                    font: 'Century Gothic',
                                    size: data.size
                                }),

                            ],
                        }),
                    ],
                },


                {
                    properties: {
                        type: docx.SectionType.CONTINUOUS,
                    },
                    children: [
                        new docx.Paragraph({
                            spacing: {
                                before: 300,
                            },
                             alignment: docx.AlignmentType.RIGHT,
                            children: [
                                new docx.TextRun({
                                    text: "30 November, 2023",
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: data.name,
                                    bold: true,
                                    // color: '#cccccc',
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: data.address1,
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),


                    ],
                },
                {
                    properties: {
                        type: docx.SectionType.CONTINUOUS,

                    },
                    children: [

                        new docx.Paragraph({
                            spacing: {
                                before: 300,
                            },
                            children: [
                                new docx.TextRun({
                                    text: data.salutation,
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),


                        new docx.Paragraph({
                            spacing: {
                                before: 300,
                            },
                            children: [
                                new docx.TextRun({
                                    text: data.intro,
                                    bold: true,
                                    size: 27
                                }),
                            ],
                        }),
                    ],
                },
                {
                    properties: {
                        type: docx.SectionType.CONTINUOUS,
                    },
                    children: [
                        new docx.Paragraph({
                            spacing: {
                                before: 200,
                            },
                            children: [
                                new docx.TextRun({
                                    text: data.para1,

                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),

                        new docx.Paragraph({

                            children: [
                                new docx.TextRun({
                                    text: data.para3,
                                    bold: true,
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: data.para5,
                                    bold: true,
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: data.para6,
                                    bold: true,
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }), new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: data.para7,
                                    bold: true,
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),
                        new docx.Paragraph({
                            spacing: {
                                before: 200,
                            },
                            children: [
                                new docx.TextRun({
                                    text: data.para8,

                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),

                        new docx.Paragraph({
                            spacing: {
                                before: 200,
                            },
                            children: [
                                new docx.TextRun({
                                    text: data.para9,

                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),
                        new docx.Paragraph({
                            spacing: {
                                before: 200,
                            },
                            children: [
                                new docx.TextRun({
                                    text: data.para10,
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),

                        new docx.Paragraph({
                            spacing: {
                                before: 200,
                            },
                            children: [
                                new docx.TextRun({
                                    text: data.para11,
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                                new docx.TextRun({
                                    text: " " + data.para11b,
                                    font: 'Century Gothic',
                                    size: data.size,
                                    bold: true,
                                }),
                            ],
                        }),

                        new docx.Paragraph({
                            spacing: {
                                before: 200,
                            },
                            children: [
                                new docx.TextRun({
                                    text: data.para12,
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),

                        new docx.Paragraph({
                            spacing: {
                                before: 200,
                            },
                            children: [
                                new docx.TextRun({
                                    text: data.para13,
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),

                        new docx.Paragraph({
                            spacing: {
                                before: 500,
                            },
                            children: [
                                new docx.TextRun({
                                    text: data.para14,
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),


                        new docx.Paragraph({
                            spacing: {
                                before: 800,
                            },
                            children: [
                                new docx.TextRun({
                                    text: data.para14b,
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: data.para14c,
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),
                    ],
                },
                {
                    properties: {
                        type: docx.SectionType.NEXT_PAGE,
                    },
                    children: [
                        new docx.Paragraph({
                            spacing: {
                                before: 1000,
                            },
                            children: [
                                new docx.TextRun({
                                    text: data.para15,
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),

                        new docx.Paragraph({
                            spacing: {
                                before: 300,
                            },
                            children: [
                                new docx.TextRun({
                                    text: data.declaration,
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),

                        new docx.Paragraph({
                            spacing: {
                                before: 600,
                            },
                            children: [
                                new docx.TextRun({
                                    text: data.sign,
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),

                        new docx.Paragraph({
                            spacing: {
                                before: 1000,
                            },
                            children: [
                                new docx.TextRun({
                                    text: data.para16,
                                    font: 'Century Gothic',
                                    size: data.size
                                }),
                            ],
                        }),
                    ]
                }


            ]
        });

        docx.Packer.toBlob(doc).then(blob => {
            saveAs(blob, `${data.name} offer letter.docx`);
        });
    };

    return (

        <Button type="button" variant={'link'} alignSelf={'center'} onClick={generate}>
            Download Here
        </Button>

    );
};

export default DynamicDocxGenerator;
