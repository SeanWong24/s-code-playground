import { Component, h, Host, State } from '@stencil/core';
import "@seanwong24/s-monaco-editor";

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  @State() htmlContent: string = '<h1>Hello World</h1>';
  @State() cssContent: string = '';
  @State() jsContent: string = '';

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Home</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-grid id="main-container">
            {this.renderEditors()}
            {this.renderResultView()}
          </ion-grid>
        </ion-content>
      </Host>
    );
  }

  private renderResultView() {
    return <ion-row id="result-container">
      <ion-col>
        <ion-card class="container-card">
          <ion-card-header>Result</ion-card-header>
          <ion-card-content class="card-content-fill">
            <iframe
              id="result-view"
              frameBorder="0"
              srcDoc={this.generateResultHtml()}
            ></iframe>
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>;
  }

  private renderEditors() {
    const editorDefinitions = [
      {
        label: 'HTML',
        value: this.htmlContent,
        language: 'html',
        valueChangeHandler: value => this.htmlContent = value
      },
      {
        label: 'CSS',
        value: this.cssContent,
        language: 'css',
        valueChangeHandler: value => this.cssContent = value
      },
      {
        label: 'JavaScript',
        value: this.jsContent,
        language: 'javascript',
        valueChangeHandler: value => this.jsContent = value
      }
    ];
    return (
      <ion-row id="main-editor-container">
        {
          editorDefinitions.map(options => (
            <ion-col class="editor-container">
              {this.renderEditor(options)}
            </ion-col>
          ))
        }
      </ion-row>
    );
  }

  private renderEditor({
    label,
    value,
    language,
    valueChangeHandler
  }: { label: string, value: string, language: string, valueChangeHandler: (value: string) => void }) {
    return (
      <ion-card class="container-card">
        <ion-card-header>{label}</ion-card-header>
        <ion-card-content class="card-content-fill">
          <s-monaco-editor
            monaco-vs-path="./build/monaco-editor/vs"
            value={value}
            language={language}
            onDidChangeModelContent={event => {
              const content = (event.currentTarget as HTMLSMonacoEditorElement).value;
              valueChangeHandler(content);
            }} />
        </ion-card-content>
      </ion-card>
    );
  }

  private generateResultHtml() {
    return `${this.htmlContent}<style>${this.cssContent}</style><script>${this.jsContent}</script>`
  }
}
