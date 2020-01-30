const LoremIpsum = (props) => {
    const text = '' +
        'Nam eget velit eu sem sodales rutrum vel quis elit. ' +
        'Donec rhoncus est id sapien ornare, a tincidunt nunc varius. ' +
        'Curabitur auctor rhoncus elementum. Donec hendrerit sapien non commodo scelerisque. ' +
        'Proin mauris libero, fermentum facilisis dolor at, aliquet tempor lacus. ' +
        'Aliquam laoreet tortor at nibh ornare, vel luctus justo pharetra. ' +
        'Aenean in ipsum ante. Praesent tincidunt, mi a sagittis sagittis, nulla ipsum feugiat urna, ' +
        'sed rutrum ipsum elit porta neque. Etiam mattis scelerisque erat, ' +
        'in bibendum felis efficitur vestibulum. Curabitur mollis elit ut ipsum vulputate, ' +
        'ac tristique turpis finibus. Donec porttitor sem ut justo posuere dignissim. Vestibulum auctor, ' +
        'justo id dapibus hendrerit, justo ex molestie tellus, vel venenatis nibh diam vitae metus. ' +
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ' +
        'In in sodales mi. Pellentesque tristique pharetra neque, ac molestie urna tincidunt eget.';

    return text.split('.', props.sentences || 1);
};
export default LoremIpsum;