import './userCardRow.scss';
import { DictRefs, Info } from '../userCard/UserCard';

type UserCardRowProps = {
  isEditing: boolean;
  inputRefs: any;
  infoKey: string;
  infoVal: string;
};

const UserCardRow = ({
  isEditing,
  inputRefs,
  infoKey,
  infoVal,
}: UserCardRowProps) => {
  return (
    <div className="userCardRow">
      <h3>{infoKey}:</h3>
      <div className="wrapper">
        <span className="info-val">{infoVal}</span>
        {(infoKey === 'address' || infoKey === 'description') && (
          <textarea
            name={infoKey}
            id=""
            className={isEditing ? '' : 'hidden'}
            ref={(ref) => (inputRefs.current[infoKey] = ref)}
            defaultValue={infoVal}
            required
          ></textarea>
        )}{' '}
        {infoKey === 'email' && (
          <input
            type="email"
            name={infoKey}
            id=""
            className={isEditing ? '' : 'hidden'}
            ref={(ref) => (inputRefs.current[infoKey] = ref)}
            defaultValue={infoVal}
            required
          />
        )}
        {infoKey !== 'email' &&
          infoKey !== 'address' &&
          infoKey !== 'description' && (
            <input
              type="text"
              name={infoKey}
              id=""
              className={isEditing ? '' : 'hidden'}
              ref={(ref) => (inputRefs.current[infoKey] = ref)}
              defaultValue={infoVal}
              required
            />
          )}
        {/* <input
          type="text"
          name=""
          id=""
          className={isEditing ? '' : 'hidden'}
          ref={(ref) => (inputRefs.current[infoKey] = ref)}
          defaultValue={infoVal}
        /> */}
      </div>
    </div>
  );
};
export default UserCardRow;
