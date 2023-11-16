import React from 'react';
import { ProjectFrame } from './projectindex';
import { Card } from '../../components/Card';

export class Project_AppleNotesExporter extends React.Component {
    manifest = {
        title: 'Apple Notes Exporter',
        date: 'Jun 2023 - Jul 2023',
        description: 'I built a MacOS app that exports all Apple Notes and their associated attachments.',
        tags: ['Swift', 'Xcode'],
        banner: '/static/img/applenotesexporter-cropped.png',
        path: '/projects/applenotesexporter'
    }

    getManifest() { return this.manifest }

    render() {
        return (
            <ProjectFrame title={this.manifest.title}>
                <Card>
                    Dissatisfied with the lack of portability of my Apple Notes data and Apple's poor official export process,
                    I developed a MacOS app that exports all Apple Notes and attachments as a means of familiarizing myself with Xcode,
                    the Swift programming language, and the MacOS app development process.
                </Card>
                <Card>
                    <h4>Capabilities</h4>
                    <p className='card-text'>
                        The user is able to choose which Apple Notes account to export the notes out of, including their iCloud account if the user has it configured.
                        <br />
                        <br />
                        The user then chooses what format to export the notes into.
                    </p>
                    <ul className='card-text'>
                        <li><b>HTML:</b> HTML format preserving all formatting and embedded images.</li>
                        <li><b>MD:</b> Markdown format for importing into markdown-based notes apps, no embedded images.</li>
                        <li><b>RTF:</b> Rich text formatting with different fonts, no embedded images.</li>
                        <li><b>TXT:</b> Plain text export preserving no formatting or embedded images.</li>
                    </ul>
                    <p className='card-text'>
                        <i>All formats export attached files in folders whose names correspond to their respective notes.</i>
                        <br />
                        <br />
                        Finally, the user chooses the name and location for the ZIP archive that will contain the exported notes before hitting the "Export" button.
                    </p>
                </Card>
                <Card>
                    <h4>Screenshot</h4>
                    <p className='card-text'>
                        I opted for a layout that lent itself to a self-explanatory "step-by-step" interaction.
                    </p>
                    <img src='/static/img/applenotesexporter.png' alt='Apple Notes Exporter' className='img-responsive rounded shadow-light' />
                    <small>Main view showing available options to configure for the export.</small>
                </Card>
                <Card>
                    <h4>Source Code & Downloads</h4>
                    <p className='card-text'>
                        Source code for this project is available on my GitHub, and downloads are available through the GitHub releases page.
                    </p>
                    <a href='https://github.com/kzaremski/apple-notes-exporter/releases/latest' target='_blank' rel='noreferrer' className='d-block text-secondary'>Download the Latest Version</a>
                    <a href='https://github.com/kzaremski/apple-notes-exporter' target='_blank' rel='noreferrer' className='d-block text-secondary'>View the Source Code</a>
                </Card>
            </ProjectFrame>
        );
    }
}