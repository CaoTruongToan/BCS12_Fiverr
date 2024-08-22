import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { congViecService } from "../../service/congViec.service";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

const WrapperSuggestJob = ({ children }) => {
    const [items, setItems] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [value, setValue] = useState("");
    const debounceValue = useDebounce(value, 1000);

    const handleGetValueChildren = (valueChildrend) => {
        setValue(valueChildrend);
    };

    // Clone children và thêm các props cần thiết
    const clonedChildren = React.cloneElement(children, {
        setOpenDropdown,
        handleGetValueChildren,
    });

    useEffect(() => {
        if (value) {
            congViecService
                .layCongViecTheoTen(value)
                .then((res) => {
                    console.log(res.data.content);
                    let newItems = res.data.content
                        .slice(0, 4)
                        .map((item, index) => {
                            return {
                                key: index.toString(),
                                label: (
                                    <Link className="flex items-center space-x-4">
                                        <img
                                            src={item.congViec?.hinhAnh}
                                            className="h-24"
                                            alt=""
                                        />
                                        <div>
                                            <h4>
                                                {item.congViec?.tenCongViec}
                                            </h4>
                                            <p>{item.congViec?.giaTien}</p>
                                        </div>
                                    </Link>
                                ),
                            };
                        });
                    setItems(newItems);
                    setOpenDropdown(true);
                })
                .catch((err) => {
                    console.log(err);
                    setOpenDropdown(false);
                });
        }
    }, [debounceValue]);

    return (
        <Dropdown
            menu={{
                items,
            }}
            open={openDropdown}
        >
            <div>{clonedChildren}</div>
        </Dropdown>
    );
};

// Define prop types for the component
WrapperSuggestJob.propTypes = {
    children: PropTypes.node.isRequired, // or PropTypes.element
};

export default WrapperSuggestJob;
