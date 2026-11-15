import type { ProjectWorkflow } from '../data/portfolioData';

export default function ProjectWorkflowMap({ workflow }: { workflow: ProjectWorkflow }) {
  return <div className="nova-workflow-map">
    <p className="nova-workflow-map__intro">{workflow.intro}</p>

    {workflow.dataset && <section className="nova-workflow-map__dataset" aria-labelledby="workflow-dataset-heading">
      <div className="nova-workflow-map__dataset-copy">
        <p className="nova-workflow-map__eyebrow">Dataset snapshot</p>
        <h3 id="workflow-dataset-heading">{workflow.dataset.title}</h3>
        <p>{workflow.dataset.summary}</p>
      </div>
      <dl className="nova-workflow-map__dataset-stats">
        {workflow.dataset.stats.map((stat) => <div key={stat.label}>
          <dt>{stat.label}</dt>
          <dd>{stat.value}</dd>
        </div>)}
      </dl>
      {workflow.dataset.note && <p className="nova-workflow-map__dataset-note">{workflow.dataset.note}</p>}
    </section>}

    <div className="nova-workflow-map__source-group">
      <p className="nova-workflow-map__eyebrow">Inputs and source routes</p>
      <ul className="nova-workflow-map__sources" aria-label="Project input routes">
        {workflow.routes.map((route, index) => <li className="nova-workflow-map__source" key={`${route.title}-${index}`}>
          <span className="nova-workflow-map__index">Route {String(index + 1).padStart(2, '0')}</span>
          <h3>{route.title}</h3>
          <p>{route.description}</p>
          {!!route.technologies?.length && <ul className="nova-workflow-map__tools" aria-label={`${route.title} technologies`}>
            {route.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>}
        </li>)}
      </ul>
    </div>

    <div className="nova-workflow-map__convergence">
      <span aria-hidden="true">↓</span>
      <p>{workflow.convergence}</p>
    </div>

    <ol className="nova-workflow-map__steps" aria-label="Processing sequence">
      {workflow.steps.map((step, index) => <li className="nova-workflow-map__step" key={`${step.title}-${index}`}>
        <span className="nova-workflow-map__index">Step {String(index + 1).padStart(2, '0')}</span>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
        {step.reason && <p className="nova-workflow-map__reason"><strong>Why it matters</strong>{step.reason}</p>}
        {!!step.technologies?.length && <ul className="nova-workflow-map__tools" aria-label={`${step.title} technologies`}>
          {step.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>}
      </li>)}
    </ol>

    <div className="nova-workflow-map__output" role="group" aria-label="Workflow output">
      <span className="nova-workflow-map__eyebrow">Output</span>
      <p>{workflow.output}</p>
    </div>
  </div>;
}
