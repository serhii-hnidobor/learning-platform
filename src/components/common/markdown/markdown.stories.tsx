import { Markdown } from './markdown';
import { Meta, StoryObj } from '@storybook/react';
import { SkeletonWrapper } from '../../common/skeleton-wrapper/skeleton-wrapper';

const meta = {
  title: 'components/common/Markdown',
  component: Markdown,
  decorators: [
    (Story) => (
      <SkeletonWrapper>
        <Story />
      </SkeletonWrapper>
    ),
  ],
} satisfies Meta<typeof Markdown>;

type Story = StoryObj<typeof Markdown>;

export default meta;

export const MarkdownLoading: Story = {
  args: {
    loading: true,
  },
};

const markdownWithCode =
  '# Status regna osculaque&#10;&#10;## Sulcis est vocas cura poscentem caedis sortibus&#10;&#10;Lorem markdownum tempus: humo quoque: puer habet stimulosque pieros agit&#10;relinquant populo, in. Paulatimque illo, summam volucres saepe crine lux sum&#10;arva mediis quoque inviso usque. Demittit longior movetur Danaas caeli,&#10;caelestes omnis hae remeat avem. Non suam fecit, nisi lustravit femina graviore&#10;virga spiritus repulsae figit. Quas ante quondam hinc labor cecidere gaudet&#10;flexus.&#10;&#10;## Tuae congestaque telo Telethusa et tibi vixisse&#10;&#10;Harenosi unde: altera demittitur, hunc inque et inguine voces, o. Emathii&#10;collaque harenae. Sanguine animo: praestanti recuset dubites.&#10;&#10;## Prece ultima&#10;&#10;Habendum stabant tibi quamquam operum, luce gravis corona dum lutea maerenti.&#10;Uno regis constituunt Troiae, instantem erat servantis fortisque, nec? Fugis&#10;subitus, a servat hiscere, sui latis in?&#10;&#10;~~~js&#10;it("should call pg_dump with some default args", async () => {&#10;    const pgdumpProcess = mockSpawn()()&#10;    const pgDumpFn = sinon.fake.returns(pgdumpProcess)&#10;    const config = {}&#10;    const p = pgdump(config, pgDumpFn)&#10;    pgdumpProcess.stdout.write("PGDMP - data - data")&#10;    pgdumpProcess.emit("close", 0)&#10;    await p&#10;&#10;    expect(pgDumpFn.calledOnce).to.be.true&#10;    const pgDumpArgs = pgDumpFn.getCall(0).args[1]&#10;    expect(pgDumpArgs).to.deep.equal(["-Fc", "-Z1"])&#10;  })&#10;~~~&#10;## Nullo bona&#10;&#10;Condidit forcipe, sibi quam testor *non habet triumphos* summe clauduntur dixit!&#10;Proserpina aliquid pocula ortuque trahit ad suorum Sisyphon et iratus recuset&#10;sedebat sitim blandis erat. Uni illius, auras laterum qua: curru vehit&#10;**tulit**. Ullis et greges Erigonen Iove *spatium* munus.&#10;&#10;~~~js&#10;it("sets config url to new port if port is different then what url is set to", function () {&#10;    const parseOptions = fake();&#10;    const config = new Config("config.json");&#10;    const saveStub = sinon.stub(config, "save");&#10;&#10;    config.set("url", "http://localhost:2368");&#10;    config.set("server.port", 2369);&#10;&#10;    return parseOptions(config, "development", {}).then(() => {&#10;      expect(config.get("url")).to.equal("http://localhost:2369/");&#10;      expect(config.get("server.port")).to.equal(2369);&#10;      expect(saveStub.calledOnce).to.be.true;&#10;    });&#10;  });&#10;~~~&#10;## Nepotibus iactanti centum&#10;&#10;Palmas Dixerat numina quod, omnia quotiensque Pindo, infelix pervius. Vertice&#10;viscera Hectoris Latreus Arcesius, in nullo bracchia firmissimus cava agros&#10;iubet, paret mentis. *Articulos* oscula si capit Maeoniam et quis uno ad, et?&#10;Patietur petitur intermissa nec morte admissum: moveri verba exigere.&#10;&#10;- Corpora naufragus Lycurgum veteris redeuntibus vis per&#10;- Concreta erat&#10;- Providus quanta fallebat virginea&#10;- Quae vires&#10;&#10;Mortisque voluptas vulnere inclinatoque longisque patriam, mendacia ego relatis&#10;vocabam locus. Aethiopesque [sequi altissimus](#obsistitur-terris), dentes&#10;planamque pars memorantur, iam derant. Occidit mala ***** funesta frustra erat:&#10;dictis fugit esse meritis signum ex iacebas lecti caesa haesurum.&#10;';
const markdownWithoutCode =
  '# Esse Tydiden quoque&#10;&#10;## Sapientius iuvencos pone quas&#10;&#10;Lorem markdownum pharetram viae **sibi**, duo avidis patet **magnum ac pati**&#10;utrumque navita *haerebat* pectus. Diri eras [futuros quod di](#delius) petentem&#10;**frater** tanti Lynceus locus: suum hora litoreo. Meo patruelis regimen se&#10;diligis lacu Apolline Minervaetransformabantur, promissa coma: tibi qui siccat,&#10;doloris. Est te spectemur odit redeuntibus comitum primum venit, o ante, patriae&#10;dextra ad Vulcanum. Victa adspexere huic, restagnantis ensis pecorumque&#10;Asopiades carina sereno temperat.&#10;&#10;Esse aequor; Cillan barbara, **si iubeas** thalamoque nervosus lora? Moventem&#10;adsuetasque sunt Actoriden de deam quaesiti in perdere aurum. Melior et illa&#10;cupiuntque falsus super virgo anima ad furta et dira, malorum sustineat per.&#10;Mihi quo epulanda fulvo dente per his progenuit [quod](#data-non-ex).&#10;&#10;- Pedum palmis mihi fecit felices casus&#10;- Qui merumque vidit&#10;- Quas eandem hic ferus caterva palmis inimica&#10;- Distantibus dixit committitur mille erat&#10;- Iam temptant sumit his serviet&#10;- Saevarum dolentibus quem moles victoris require&#10;&#10;## Mea hunc repetitque circuiere pollue dolentibus fraxinus&#10;&#10;[Deceant](#maior-tuaeque) acclinia, Philomela inobrutus videre *racemis certum*&#10;loquentem tempora tenuem, scit canes satis patrumque peioris. Pars debet&#10;multamque patre attonitus castris visa, amissa, sed iam tyranni, iactatis.&#10;Pugnabam nec centum, exspectata ramum aequoris sublime falsi est trahebat&#10;Danaen, insequitur viveret percussit tura. Ineamus sic altera cupidine artus&#10;succiso nec Ephyre deduxit longa. Vicinia canistris feriente concubitus neque.&#10;&#10;> Solus modo salute circumfususque *vix domus*, mutabitur, tempora alis&#10;> conceptaque enim *Idan*, pax possem sui, hic! Cereris Canens. Maestam amor&#10;> senem; faciemque aliter, faciat quo si gratia pugman, surgit. Fulmen tanta&#10;> excipiunt et paventis more credule caelo, tum intus limen?&#10;&#10;Miserabilis et addunt **obsuntque vitae** legit natus, sit sed metum meis; solio&#10;possedit, tecta et. Nervis currus adspexit ballaenarumque descendit inclinatoque&#10;moenia, prosit tyranni designat habet aliudque crudele deorum. Modo sunt carmine&#10;onus virgo opis vix quo, pace simul iunguntur inpune pugnantemque sede&#10;quotiensque silicem. Qua avos **Iovem imitatus** vultusque civilia! Et in, ut&#10;saxis circumflua amor.&#10;&#10;Qua pugnae verumtamen vero advehar essemus fuit. Poeantia mea muros puniceo ira&#10;mediique ipsam. Crinem et nuper nemorisque excutit, aliquid praescia pectora&#10;iussa.&#10;';
export const MarkdownDefault: Story = {
  args: {
    source: markdownWithoutCode,
  },
};

export const MarkdownWithCode: Story = {
  args: {
    source: markdownWithCode,
  },
};
