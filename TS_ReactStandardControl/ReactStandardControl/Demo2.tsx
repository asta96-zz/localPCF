


export class SaiClass extends React.Component<IFacepileBasicExampleProps, IFacepileBasicExampleState> {
	constructor(props: IFacepileBasicExampleProps) {
		super(props);

		this.state = {
			numberOfFaces: props.numberOfFaces || 3,
			imagesFadeIn: true,
			personaSize: PersonaSize.size32
		};
	}
